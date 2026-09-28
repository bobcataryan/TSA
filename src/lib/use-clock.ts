"use client";
import { useSyncExternalStore } from "react";
let current = Date.now();
const listeners = new Set<() => void>();
let interval: ReturnType<typeof setInterval> | undefined;
function subscribe(callback: () => void) {
  listeners.add(callback);
  if (!interval) {
    current = Date.now();
    interval = setInterval(() => {
      current = Date.now();
      listeners.forEach((listener) => listener());
    }, 1000);
  }
  return () => {
    listeners.delete(callback);
    if (!listeners.size) {
      clearInterval(interval);
      interval = undefined;
    }
  };
}
export function useClock() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
export function chapterDate(now: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(now));
}
