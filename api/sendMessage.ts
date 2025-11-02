// api/sendMessage.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, contact, message, recaptchaToken } = req.body;

  if (!name || !contact || !message || !recaptchaToken) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 1. Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

    const recaptchaRes = await fetch(recaptchaUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) { // For v2, success is the main check
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    // 2. Send message to Telegram
    const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.VITE_TELEGRAM_CHAT_ID;
    
    const telegramMessage = `
🚀 Новая заявка с портфолио!

👤 Имя: ${name}
📱 Контакт: ${contact}
💬 Сообщение:
${message}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    });

    if (!telegramRes.ok) {
      const errorBody = await telegramRes.json();
      console.error('Telegram API Error:', errorBody);
      throw new Error('Failed to send message to Telegram');
    }

    return res.status(200).json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
