import React, { useEffect, useMemo, useRef, useState } from "react";
import { createSession, patchTask } from "../services/api";
import { Task } from "../types";

type Phase = "work" | "short" | "long";

const PHASES: { phase: Phase; minutes: number }[] = [
  { phase: "work", minutes: 25 },
  { phase: "short", minutes: 5 },
  { phase: "work", minutes: 25 },
  { phase: "short", minutes: 5 },
  { phase: "work", minutes: 25 },
  { phase: "short", minutes: 5 },
  { phase: "work", minutes: 25 },
  { phase: "long", minutes: 30 },
];

export default function Timer({
  tasks,
  selectedTaskId,
  onTaskUpdated,
}: {
  tasks: Task[];
  selectedTaskId?: number | null;
  onTaskUpdated: (t: Task) => void;
}) {
  const [index, setIndex] = useState(0);
  const phaseInfo = PHASES[index];
  const [secondsLeft, setSecondsLeft] = useState(phaseInfo.minutes * 60);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(phaseInfo.minutes * 60);
  }, [index]);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = window.setInterval(
      () => setSecondsLeft((s) => s - 1),
      1000,
    );
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // notificação
      notify(`Fim da fase: ${phaseInfo.phase}`);
      // se for work, registra sessão na API (associa à tarefa selecionada)
      if (phaseInfo.phase === 'work') {
        const task = tasks.find(t => t.id === selectedTaskId) || tasks[0]
        if (task) {
          const rec = {
            taskId: task.id,
            durationMinutes: phaseInfo.minutes,
            startedAt: new Date().toISOString(),
          }
          createSession(rec).catch(() => {})
          // incrementar contador local
          patchTask(task.id, { sessions: task.sessions + 1 }).then(onTaskUpdated).catch(() => {})
        }
      }
      // avançar fase
      setIndex((i) => (i + 1) % PHASES.length);
      setRunning(false);
    }
  }, [secondsLeft]);

  const minutes = useMemo(
    () => Math.floor(Math.max(0, secondsLeft) / 60),
    [secondsLeft],
  );
  const secs = useMemo(() => Math.max(0, secondsLeft) % 60, [secondsLeft]);

  function toggle() {
    setRunning((r) => !r);
  }

  function skip() {
    setIndex((i) => (i + 1) % PHASES.length);
    setRunning(false);
  }

  function notify(body: string) {
    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "granted"
    ) {
      new Notification("Pomodoro", { body });
    } else if (
      typeof Notification !== "undefined" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((p) => {
        if (p === "granted") new Notification("Pomodoro", { body });
      });
    }
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {phaseInfo.phase === "work"
              ? "Estudo"
              : phaseInfo.phase === "short"
                ? "Pausa curta"
                : "Pausa longa"}
          </div>
          <div className="muted">
            Sessão atual: {index + 1}/{PHASES.length}
          </div>
        </div>
        <div style={{ fontSize: 40, fontWeight: 800 }}>
          {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn" onClick={toggle}>
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={skip}
          style={{
            background: "var(--orange)",
            color: "#081222",
            padding: "8px 12px",
            borderRadius: 8,
          }}
        >
          Pular
        </button>
      </div>
    </div>
  );
}
