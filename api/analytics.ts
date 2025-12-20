// api/analytics.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Enable CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method === "POST") {
    try {
      // Обработка метрик производительности
      const metric = request.body;

      // В продакшене можно отправлять в Google Analytics или другую систему аналитики
      if (process.env.NODE_ENV === "production") {
        // Здесь можно отправить метрику в Google Analytics или другую аналитическую систему
        console.log("Web Vitals metric:", JSON.stringify(metric));
      } else {
        // В разработке просто логируем
        console.log("Development - Web Vitals metric:", JSON.stringify(metric));
      }

      return response.status(200).json({ success: true });
    } catch (error) {
      console.error("Analytics processing error:", error);
      return response.status(200).json({
        success: false,
        error: "Analytics processing error, but request handled gracefully",
      });
    }
  } else {
    // Для других методов возвращаем 405 Method Not Allowed
    return response.status(405).json({
      success: false,
      error: "Method not allowed. Use POST to send analytics data.",
    });
  }
}
