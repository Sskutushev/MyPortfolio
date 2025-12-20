import type { Handler } from "@netlify/functions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler: Handler = async (event) => {
  // Handle preflight requests for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod === "POST") {
    try {
      if (!event.body) {
        return {
          statusCode: 200, // Return 200 to not show errors in the client console
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            error:
              "Analytics processing error: No body, but request handled gracefully",
          }),
        };
      }

      const metric = JSON.parse(event.body);

      if (process.env.NODE_ENV === "production") {
        console.log("Web Vitals metric:", JSON.stringify(metric));
      } else {
        console.log("Development - Web Vitals metric:", JSON.stringify(metric));
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
      console.error("Analytics processing error:", error);
      // Return a successful status code so the client doesn't log an error,
      // as analytics failures are not critical for user experience.
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: "Analytics processing error, but request handled gracefully",
        }),
      };
    }
  }

  // For other methods, return 405 Method Not Allowed
  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({
      success: false,
      error: "Method not allowed. Use POST to send analytics data.",
    }),
  };
};
