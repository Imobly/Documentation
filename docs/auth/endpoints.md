# Endpoints

## Public

- POST `/api/v1/auth/register` — registrar novo usuário
- POST `/api/v1/auth/login` — autenticar e receber um access token (JWT)

## Protected

- GET `/api/v1/auth/me` — retorna dados do usuário autenticado
- POST `/api/v1/auth/change-password` — troca de senha (usuário autenticado)

## Admin

- GET `/api/v1/admin/users` — listar usuários (admin)
- POST `/api/v1/admin/users` — criar usuário (admin)

(Para exemplos de request/response, consulte o repositório `Auth-api`.)
