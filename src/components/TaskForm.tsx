import React, { useState } from "react";
import { createTask } from "../services/api";
import { Task } from "../types";

export default function TaskForm({
  onCreated,
}: {
  onCreated: (t: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;
    setLoading(true);
    try {
      const task = await createTask({
        title: title.trim(),
        subject: subject.trim(),
      });
      onCreated(task);
      setTitle("");
      setSubject("");
    } catch (err) {
      alert("Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <label>
        <div className="muted">Tarefa</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Título"
        />
      </label>
      <label>
        <div className="muted">Disciplina</div>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-label="Disciplina"
        />
      </label>
      <div style={{ marginTop: 8 }}>
        <button className="btn" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar"}
        </button>
      </div>
    </form>
  );
}
