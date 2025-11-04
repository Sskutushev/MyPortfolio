// api/analytics.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === "POST") {
    // Обработка метрик производительности
    const metric = request.body;

    // В продакшене можно отправлять в Google Analytics или другую систему аналитики
    try {
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
      return response.status(500).json({
        success: false,
        error: "Internal server error during analytics processing",
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
