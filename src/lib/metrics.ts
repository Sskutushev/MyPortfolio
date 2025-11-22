// src/lib/metrics.ts
export const ymGoal = (goal: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(105459636, "reachGoal", goal, params || {});
  }
};
