// api/sendMessage.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, contact, message, recaptchaToken } = req.body;

  // Basic validation: name, contact, and message are always required.
  if (!name || !contact || !message) {
    return res
      .status(400)
      .json({ message: "Missing required fields: name, contact, or message" });
  }

  try {
    // 1. Verify reCAPTCHA token if it was provided
    if (recaptchaToken) {
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      if (!recaptchaSecret) {
        console.error("Missing reCAPTCHA secret key");
        return res
          .status(500)
          .json({
            message: "Server configuration error: Missing reCAPTCHA secret",
          });
      }

      const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify`;

      const recaptchaRes = await fetch(recaptchaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
      });

      const recaptchaData = await recaptchaRes.json();
      console.log("reCAPTCHA verification response:", recaptchaData);

      if (!recaptchaData.success) {
        console.error(
          "reCAPTCHA verification failed:",
          recaptchaData["error-codes"],
        );
        return res
          .status(400)
          .json({
            message: "reCAPTCHA verification failed",
            errorCodes: recaptchaData["error-codes"],
          });
      }
    }

    // 2. Send message to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram bot token or chat ID");
      return res
        .status(500)
        .json({
          message: "Server configuration error: Missing Telegram credentials",
        });
    }

    // Sanitize user input before including it in the HTML message
    const safeName = escapeHtml(name);
    const safeContact = escapeHtml(contact);
    const safeMessage = escapeHtml(message);

    const telegramMessage = `
🚀 <b>Новая заявка с портфолио!</b>

👤 <b>Имя:</b> ${safeName}
📱 <b>Контакт:</b> ${safeContact}
💬 <b>Сообщение:</b>
<pre>${safeMessage}</pre>
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await telegramRes.json();
    console.log("Telegram API Response:", telegramResult);

    if (!telegramRes.ok) {
      console.error("Telegram API Error:", telegramResult);
      return res.status(telegramRes.status).json({
        message: "Failed to send message to Telegram",
        error: telegramResult,
      });
    }

    return res
      .status(200)
      .json({ message: "Message sent successfully", result: telegramResult });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
