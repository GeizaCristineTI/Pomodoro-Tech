import React, { useEffect, useRef, useState } from "react";
import { createSchedule, fetchSchedules } from "../services/api";
import { Schedule } from "../types";

function msUntil(timeHhMm: string) {
  const [hh, mm] = timeHhMm.split(":").map(Number);
  const now = new Date();
  const next = new Date(now);
  next.setHours(hh, mm, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

export default function ScheduleForm() {
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);

  useEffect(() => {
    fetchSchedules()
      .then(setSchedules)
      .catch(() => {});
    if (
      typeof Notification !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  useEffect(() => {
    // limpar timers antigos
    timersRef.current.forEach((id) => clearTimeout(id));
    intervalsRef.current.forEach((id) => clearInterval(id));
    timersRef.current = [];
    intervalsRef.current = [];

    schedules.forEach((s) => {
      try {
        const ms = msUntil(s.time);
        const t = window.setTimeout(() => {
          if (
            typeof Notification !== "undefined" &&
            Notification.permission === "granted"
          ) {
            new Notification("Hora de estudar", {
              body: `${s.label ?? "Agendado"} — ${s.time}`,
            });
          }
          // depois de disparar, agendar repetição diária
          const i = window.setInterval(
            () => {
              if (
                typeof Notification !== "undefined" &&
                Notification.permission === "granted"
              ) {
                new Notification("Hora de estudar", {
                  body: `${s.label ?? "Agendado"} — ${s.time}`,
                });
              }
            },
            24 * 60 * 60 * 1000,
          );
          intervalsRef.current.push(i);
        }, ms);
        timersRef.current.push(t);
      } catch (err) {
        // ignore
      }
    });

    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      intervalsRef.current.forEach((id) => clearInterval(id));
    };
  }, [schedules]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) return;
    try {
      const s = await createSchedule({ time, label: "Estudo agendado" });
      setSchedules((prev) => [...prev, s]);
      setTime("");
      if (
        typeof Notification !== "undefined" &&
        Notification.permission !== "granted"
      ) {
        Notification.requestPermission().catch(() => {});
      }
      alert("Agendado");
    } catch {
      alert("Erro ao agendar");
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="muted">Agendar notificação diária (hora local)</div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label="Hora"
        />
        <div style={{ marginTop: 8 }}>
          <button className="btn">Agendar</button>
        </div>
      </form>
      <div style={{ marginTop: 12 }}>
        {schedules.map((s) => (
          <div key={s.id} className="muted">
            {s.label} — {s.time}
          </div>
        ))}
      </div>
    </div>
  );
}
