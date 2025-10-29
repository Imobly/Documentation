# Configuração

Variáveis de ambiente importantes (usar `.env` ou `.env.example` no repositório Auth-api):

- SECRET_KEY — chave secreta para assinar JWT
- ACCESS_TOKEN_EXPIRE_MINUTES — expiração do access token
- DATABASE_URL — string de conexão do Postgres

Exemplo `.env`:

```
SECRET_KEY=CHANGEME
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=postgresql://auth:password@db:5432/authdb
```
