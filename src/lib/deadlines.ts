import type { Deadline } from "@/data/deadlines";
export function deadlineState(deadline: Deadline, now: number) {
  if (deadline.precision === "day") {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(now));
    return {
      closed: today > deadline.date,
      dueToday: today === deadline.date,
      days: null,
      hours: null,
      minutes: null,
    };
  }
  const difference = new Date(deadline.date).getTime() - now;
  const minutes = Math.max(0, Math.ceil(difference / 60000));
  return {
    closed: difference <= 0,
    dueToday: false,
    days: Math.floor(minutes / 1440),
    hours: Math.floor((minutes % 1440) / 60),
    minutes: minutes % 60,
  };
}

export function deadlineCalendarParts(deadline: Deadline) {
  const value =
    deadline.precision === "day"
      ? new Date(`${deadline.date}T12:00:00Z`)
      : new Date(deadline.date);
  const timeZone = deadline.precision === "day" ? "UTC" : "America/Chicago";
  return {
    month: new Intl.DateTimeFormat("en-US", { timeZone, month: "short" })
      .format(value)
      .toUpperCase(),
    day: new Intl.DateTimeFormat("en-US", { timeZone, day: "2-digit" }).format(
      value,
    ),
  };
}
