export interface Task {
  id: number;
  title: string;
  subject: string;
  sessions: number;
}

export interface Schedule {
  id: number;
  time: string; // HH:MM
  label?: string;
}

export interface SessionRecord {
  id?: number;
  taskId: number;
  durationMinutes: number;
  startedAt: string;
}
