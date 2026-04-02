import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import ScheduleForm from "./components/ScheduleForm";
import { fetchTasks } from "./services/api";
import { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((t) => setTasks(t))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleCreated(t: Task) {
    setTasks((s) => [t, ...s]);
  }
  function handleUpdated(t: Task) {
    setTasks((s) => s.map((x) => (x.id === t.id ? t : x)));
  }
  function handleDeleted(id: number) {
    setTasks((s) => s.filter((x) => x.id !== id));
  }

  return (
    <main className="container">
      <h1 style={{ color: "var(--blue-light)" }}>Estudo Pomodoro</h1>
      <p className="muted">
        Aplicação para estudantes de TI: Cronômetro Pomodoro, agendamento e
        registro de sessões. ⏱️ O que é o Método Pomodoro?

O Método Pomodoro é uma técnica de gestão do tempo criada para aumentar o foco, a produtividade e a qualidade do aprendizado.

Ele funciona com base em ciclos de estudo e pausas estratégicas. A cada 25 minutos de concentração total em uma tarefa, você faz uma pausa de 5 minutos. Após completar quatro ciclos, é recomendado fazer uma pausa maior, de aproximadamente 30 minutos.

Essa abordagem ajuda o cérebro a manter a atenção por mais tempo, evitando o cansaço mental e melhorando a absorção do conteúdo
        </p>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 16,
          marginTop: 16,
        }}
      >
        <div>
          <TaskForm onCreated={handleCreated} />
          <div style={{ height: 12 }} />
          {loading ? (
            <div className="card">Carregando tarefas...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          )}
        </div>
        <div>
          <div style={{ marginBottom: 8 }}>
            <label className="muted">Tarefa ativa</label>
            <select value={selectedTaskId ?? ''} onChange={e => setSelectedTaskId(e.target.value ? Number(e.target.value) : null)}>
              <option value="">Nenhuma</option>
              {tasks.map(t => (
                <option key={t.id} value={t.id}>{t.title} — {t.subject}</option>
              ))}
            </select>
          </div>
          <Timer tasks={tasks} selectedTaskId={selectedTaskId} onTaskUpdated={handleUpdated} />
          <div style={{ height: 12 }} />
          <ScheduleForm />
          <div style={{ height: 12 }} />
          <div className="card">
            <div style={{ fontWeight: 700 }}>Músicas para foco</div>
            <ul>
              <li>
                <a href="https://youtu.be/f02mOEt11OQ?si=szO-kdGPWzUeizG0" target="_blank" rel="noopener noreferrer">Lo-fi Chill</a>
              </li>
              <li>
                <a href="https://youtu.be/SigIbCVMTzU?si=cj5MuNdeg3ibRZR8" target="_blank" rel="noopener noreferrer">Study Beats</a>
              </li>
              <li>
                <a href="https://youtu.be/0Qw8ctDj658?si=DVXvqLAcp7zoR9sC" target="_blank" rel="noopener noreferrer">Focus Instrumental</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
