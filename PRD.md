# Mini PRD — Pomodoro Tech

## Problema

Estudantes universitários de TI têm dificuldade em manter sessões de estudo focadas e lembrar de começar a estudar em horários planejados. Muitos perdem tempo trocando de tarefa, esquecem de pausas estruturadas e não registram o tempo investido por disciplina.

## Por que vale a pena resolver

Melhorar a cadência de estudo com pausas regulares aumenta retenção e evita burnout; notificações programadas ajudam a criar hábito. Rastrear sessões por disciplina permite priorizar revisões.

## Usuário alvo

Estudantes de graduação em Tecnologia ou áreas relacionadas (sem limite de idade), que estudam por conta própria e precisam de lembretes e estrutura para sessões concentradas.

## Solução (funcionalidades essenciais)

- Cronômetro Pomodoro com fases: trabalho (25min), pausa curta (5min), pausa longa (30min) após sequência.
- Registro de tarefas/disciplina (criar, listar, remover).
- Incremento automático de sessões ao terminar uma fase de trabalho (persistido na API).
- Agendamento de notificação diária em horário escolhido pelo usuário.

Cada funcionalidade é essencial: sem o cronômetro não há método Pomodoro; sem tasks o usuário não vincula sessão a disciplina; sem agendamento o usuário perde o lembrete no horário escolhido.

## Decisões técnicas

- Front-end: React + TypeScript (Vite).
- Estilos: CSS Modules / global simple (cores fornecidas via variáveis CSS).
- API: json-server (mock) com entidades:
  - `tasks` (id, title, subject, sessions)
  - `schedules` (id, time, label)
  - `sessions` (registro de sessões concluídas)
- Operações usadas: GET (listar), POST (criar task/schedule/session), PATCH (atualizar contagem de sessões), DELETE (remover task).

## Observações

- Notificações usam Notification API do navegador (pede permissão ao usuário).
- O app prioritiza simplicidade e funcionalidade mínima para demonstrar integração com API REST e persistência.
