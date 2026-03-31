import React from "react";
import { Task } from "../types";
import { patchTask, deleteTask } from "../services/api";

export default function TaskList({
  tasks,
  onUpdated,
  onDeleted,
}: {
  tasks: Task[];
  onUpdated: (t: Task) => void;
  onDeleted: (id: number) => void;
}) {
  async function incSessions(t: Task) {
    const updated = await patchTask(t.id, { sessions: t.sessions + 1 });
    onUpdated(updated);
  }

  async function remove(t: Task) {
    if (!confirm("Remover tarefa?")) return;
    await deleteTask(t.id);
    onDeleted(t.id);
  }

  if (!tasks.length)
    return <div className="card">Nenhuma tarefa criada ainda.</div>;

  return (
    <div className="card">
      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              <div className="muted">
                {t.subject} • sessões: {t.sessions}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" onClick={() => incSessions(t)}>
                + sessão
              </button>
              <button
                onClick={() => remove(t)}
                style={{
                  background: "transparent",
                  color: "var(--orange)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "6px 8px",
                  borderRadius: 8,
                }}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
