import type { Handler } from "@netlify/functions";

const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const handler: Handler = async (event) => {
  console.log("[sendMessage] Function started.");

  if (event.httpMethod !== "POST") {
    console.log("[sendMessage] Blocked non-POST request.");
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Only POST requests allowed" }),
    };
  }

  try {
    if (!event.body) {
      console.log("[sendMessage] Request body is empty.");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is empty" }),
      };
    }

    const { name, contact, message, recaptchaToken } = JSON.parse(event.body);
    console.log("[sendMessage] Received request body.");

    if (!name || !contact || !message) {
      console.log(
        "[sendMessage] Missing required fields: name, contact, or message.",
      );
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing required fields: name, contact, or message",
        }),
      };
    }
    console.log("[sendMessage] Required fields are present.");

    // 1. Verify reCAPTCHA token if it exists
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      console.log(
        "[sendMessage] reCAPTCHA secret is present, verifying token.",
      );
      const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const recaptchaRes = await fetch(recaptchaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(
          recaptchaSecret,
        )}&response=${encodeURIComponent(recaptchaToken)}`,
      });

      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success) {
        console.error(
          "[sendMessage] reCAPTCHA verification failed. Response:",
          recaptchaData,
        );
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "reCAPTCHA verification failed",
            errorCodes: recaptchaData["error-codes"],
          }),
        };
      }
      console.log("[sendMessage] reCAPTCHA verification successful.");
    } else {
      console.log(
        "[sendMessage] Skipping reCAPTCHA verification (secret or token not provided).",
      );
    }

    // 2. Send message to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error(
        "[sendMessage] Server configuration error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.",
      );
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Server configuration error: Missing Telegram credentials",
        }),
      };
    }
    console.log("[sendMessage] Telegram credentials found.");

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

    console.log("[sendMessage] Sending message to Telegram...");
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

    if (!telegramRes.ok) {
      console.error(
        "[sendMessage] Telegram API Error. Status:",
        telegramRes.status,
        "Response:",
        telegramResult,
      );
      return {
        statusCode: telegramRes.status,
        body: JSON.stringify({
          message: "Failed to send message to Telegram",
          error: telegramResult,
        }),
      };
    }

    console.log("[sendMessage] Message sent successfully to Telegram.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message sent successfully",
        result: telegramResult,
      }),
    };
  } catch (error) {
    console.error("[sendMessage] Unexpected error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
