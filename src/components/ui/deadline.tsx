"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Clock3 } from "lucide-react";
import { membershipDeadline, type Deadline } from "@/data/deadlines";
import { deadlineState } from "@/lib/deadlines";
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
function snapshot() {
  return current;
}
function serverSnapshot() {
  return null;
}
export function useNow() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
export function DeadlineStatus({
  deadline,
  large = false,
}: {
  deadline: Deadline;
  large?: boolean;
}) {
  const now = useNow();
  const state = now === null ? null : deadlineState(deadline, now);
  if (!state && deadline.precision === "day")
    return <span className="deadline-status">Date-only deadline</span>;
  if (state?.closed)
    return <span className="deadline-status closed">Deadline passed</span>;
  if (deadline.precision === "day")
    return (
      <span className="deadline-status">
        {state?.dueToday
          ? "Due today · cutoff time not specified"
          : "Upcoming · cutoff time not specified"}
      </span>
    );
  return (
    <span
      className={large ? "countdown countdown-large" : "countdown"}
      aria-label={
        state
          ? `${state.days} days, ${state.hours} hours, ${state.minutes} minutes remaining`
          : "Calculating time remaining"
      }
    >
      {[
        [state?.days ?? "—", "Days"],
        [state?.hours ?? "—", "Hours"],
        [state?.minutes ?? "—", "Min"],
      ].map(([value, label]) => (
        <span className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </span>
      ))}
    </span>
  );
}
export function DeadlineStrip() {
  const now = useNow();
  const closed = now !== null && deadlineState(membershipDeadline, now).closed;
  return (
    <div className="deadline-strip">
      <div className="container deadline-strip-inner">
        <p>
          <Clock3 size={14} aria-hidden="true" />
          {closed ? (
            "The 2026–27 membership deadline has passed. Contact a TSA officer if you have questions."
          ) : (
            <>
              <strong>Membership deadline</strong>
              <span>September 30 · 11:59 PM Central Time. No exceptions.</span>
            </>
          )}
        </p>
        {!closed && (
          <Link href="/#checklist">
            Complete your checklist <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </div>
  );
}
export function MembershipTiming({
  children,
  expired,
}: {
  children: React.ReactNode;
  expired: React.ReactNode;
}) {
  const now = useNow();
  return (
    <>
      {now !== null && deadlineState(membershipDeadline, now).closed
        ? expired
        : children}
    </>
  );
}
