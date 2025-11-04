// src/lib/performance.ts

// Функция для отправки метрик в аналитику
export const sendToAnalytics = (metric: any) => {
  // В production можно отправлять в Google Analytics, Vercel Analytics и т.д.
  if (typeof window !== "undefined" && navigator.sendBeacon) {
    const body = JSON.stringify(metric);
    const url = "/api/analytics";

    // Используем `navigator.sendBeacon()` если доступен
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      // В случае отсутствия sendBeacon, делаем обычный fetch, но без выброса ошибки
      fetch(url, { body, method: "POST", keepalive: true }).catch((err) => {
        // Игнорируем ошибки отправки метрик, они не критичны для работы приложения
        console.debug("Failed to send analytics:", err);
      });
    }
  } else {
    // В dev режиме просто логируем
    console.debug("Web Vital:", metric);
  }
};

// Мониторинг долгих задач
export const observeLongTasks = () => {
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn("Long task detected:", entry);
            // Можно отправить в аналитику
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      console.error("Long task observer failed:", e);
    }
  }
};

// Мониторинг layout shifts
export const observeLayoutShifts = () => {
  if ("PerformanceObserver" in window) {
    try {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
            if (cls > 0.1) {
              console.warn("High CLS detected:", cls);
            }
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.error("Layout shift observer failed:", e);
    }
  }
};

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals")
      .then((webVitalsModule) => {
        // Используем новые функции из web-vitals v5
        webVitalsModule.onCLS(onPerfEntry);
        webVitalsModule.onFCP(onPerfEntry);
        webVitalsModule.onINP(onPerfEntry);
        webVitalsModule.onLCP(onPerfEntry);
        webVitalsModule.onTTFB(onPerfEntry);
      })
      .catch((err) => {
        console.error("Failed to load web-vitals:", err);
      });
  }
};
