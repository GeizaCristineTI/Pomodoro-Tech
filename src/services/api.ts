import { Task, Schedule, SessionRecord } from "../types";

const API = "http://localhost:4000";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}

export async function createTask(
  payload: Omit<Task, "id" | "sessions">,
): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, sessions: 0 }),
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
}

export async function patchTask(
  id: number,
  patch: Partial<Task>,
): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
}

export async function fetchSchedules(): Promise<Schedule[]> {
  const res = await fetch(`${API}/schedules`);
  if (!res.ok) throw new Error("Erro ao buscar agendamentos");
  return res.json();
}

export async function createSchedule(
  payload: Omit<Schedule, "id">,
): Promise<Schedule> {
  const res = await fetch(`${API}/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao criar agendamento");
  return res.json();
}

export async function createSession(
  record: SessionRecord,
): Promise<SessionRecord> {
  const res = await fetch(`${API}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error("Erro ao registrar sessão");
  return res.json();
}
