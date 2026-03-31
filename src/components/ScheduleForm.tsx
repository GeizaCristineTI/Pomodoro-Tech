import React, { useState, useEffect } from "react";
import { createSchedule, fetchSchedules } from "../services/api";
import { Schedule } from "../types";

export default function ScheduleForm() {
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetchSchedules()
      .then(setSchedules)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) return;
    try {
      const s = await createSchedule({ time, label: "Agendado" });
      setSchedules((prev) => [...prev, s]);
      setTime("");
      // pedir permissão de notificação
      if (
        typeof Notification !== "undefined" &&
        Notification.permission !== "granted"
      )
        Notification.requestPermission();
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
