# Pomodoro Studies

Aplicação para estudantes de TI: cronômetro Pomodoro, agendamento de notificações e registro de sessões. Desenvolvido com React + TypeScript e uma API mock com `json-server`.

## O que está incluído

- Front-end: Vite + React + TypeScript
- API mock: `db.json` consumida via `json-server`
- Mini PRD: `PRD.md`

## Rodando localmente

1. Instale dependências:

```bash
npm install
```

2. Inicie a API (porta 4000):

```bash
npm run api
```

3. Em outro terminal, inicie o front:

```bash
npm run dev
```

Abra `http://localhost:5173`.

## Notas

- Para receber notificações permita `Notification` quando solicitado.
- As músicas são links do YouTube na barra lateral.

## Deploy e git

1. Crie um repositório no GitHub e empurre o projeto:

```bash
git remote add origin git@github.com:<usuario>/<repo>.git
git branch -M main
git push -u origin main
```

2. Para deploy rápido use Vercel (ligue sua conta GitHub e importe o repo). A configuração padrão do Vite funciona automaticamente.

## Observações finais
- Use `npm run api` para iniciar a API mock (porta 4000) antes de abrir o front.
- Se abrir localmente via Live Server (file://) a aplicação React não funcionará — use o servidor do Vite em `http://localhost:5173`.
