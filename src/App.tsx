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
      <h1 style={{ color: "var(--blue-light)" }}>Pomodoro Studies</h1>
      <p className="muted">
        Aplicação para estudantes de TI: cronômetro Pomodoro, agendamento e
        registro de sessões.
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
          <Timer tasks={tasks} onTaskUpdated={handleUpdated} />
          <div style={{ height: 12 }} />
          <ScheduleForm />
          <div style={{ height: 12 }} />
          <div className="card">
            <div style={{ fontWeight: 700 }}>Músicas para foco</div>
            <ul>
              <li>
                <a
                  href="https://youtu.be/f02mOEt11OQ?si=szO-kdGPWzUeizG0"
                  target="_blank"
                >
                  Lo-fi Chill
                </a>
              </li>
              <li>
                <a
                  href="https://youtu.be/SigIbCVMTzU?si=cj5MuNdeg3ibRZR8"
                  target="_blank"
                >
                  Study Beats
                </a>
              </li>
              <li>
                <a
                  href="https://youtu.be/0Qw8ctDj658?si=DVXvqLAcp7zoR9sC"
                  target="_blank"
                >
                  Focus Instrumental
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
