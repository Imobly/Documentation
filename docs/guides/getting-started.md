# Getting Started

Este guia irá te ajudar a configurar e executar o **Imobly** em seu ambiente de desenvolvimento.

## ⚡ Quick Start

### 1. Pré-requisitos

=== "Docker (Recomendado)"

    - Docker 20.10+
    - Docker Compose 2.0+

=== "Instalação Local"

    - Python 3.9+
    - MySQL 8.0
    - Redis (opcional)

### 2. Clone o Repositório

```bash
git clone https://github.com/Imobly/imobly-backend.git
cd imobly-backend
```

### 3. Configuração de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/imobly
DATABASE_URL_TEST=mysql+pymysql://user:password@localhost:3306/imobly_test

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 4. Executar com Docker

```bash
# Construir e executar todos os serviços
docker-compose up --build -d

# Verificar os logs
docker-compose logs -f

# Parar os serviços
docker-compose down
```

### 5. Executar Localmente

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar migrações
alembic upgrade head

# Executar o servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🔗 Acessando a Aplicação

Após a execução, você pode acessar:

- **Documentação da API:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **API Base:** http://localhost:8000/api/v1

## 📁 Estrutura do Projeto

```
imobly-backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   └── router.py
│   │   └── deps.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── main.py
├── alembic/
├── tests/
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

## 🔧 Comandos Úteis

### Database

```bash
# Criar nova migração
alembic revision --autogenerate -m "mensagem da migração"

# Aplicar migrações
alembic upgrade head

# Reverter migração
alembic downgrade -1
```

### Testes

```bash
# Executar todos os testes
pytest

# Executar com coverage
pytest --cov=app

# Executar testes específicos
pytest tests/test_auth.py
```

### Docker

```bash
# Reconstruir apenas um serviço
docker-compose up --build api

# Acessar container
docker-compose exec api bash

# Ver logs de um serviço
docker-compose logs -f api
```

## 🔐 Autenticação

O sistema usa **JWT tokens** para autenticação. Para testar:

1. **Registrar usuário:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/register" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@imobly.com",
       "password": "123456789",
       "name": "Admin"
     }'
   ```

2. **Fazer login:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@imobly.com",
       "password": "123456789"
     }'
   ```

3. **Usar o token nas requisições:**
   ```bash
   curl -X GET "http://localhost:8000/api/v1/properties" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## 🎯 Próximos Passos

1. **[Explore a API](../api/index.md)** - Documentação completa dos endpoints
2. **[Configure Autenticação](../auth/index.md)** - Entenda o sistema de auth
3. **[Veja a Arquitetura](architecture.md)** - Estrutura do sistema
4. **[Deploy](deployment.md)** - Como fazer deploy em produção

## ❓ Problemas Comuns

### Erro de Conexão com Banco

```
sqlalchemy.exc.OperationalError: (pymysql.err.OperationalError) (2003, "Can't connect to MySQL server")
```

**Solução:** Verifique se o MySQL está rodando e as credenciais no `.env` estão corretas.

### Erro de Permissão no Docker

```
permission denied while trying to connect to the Docker daemon socket
```

**Solução:** Execute com `sudo` ou adicione seu usuário ao grupo docker:
```bash
sudo usermod -aG docker $USER
```

### Porta já em uso

```
Error starting userland proxy: listen tcp4 0.0.0.0:8000: bind: address already in use
```

**Solução:** Altere a porta no docker-compose.yml ou pare o processo que está usando a porta 8000.

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique os [Issues conhecidos](https://github.com/Imobly/Documentation/issues)
2. Consulte a [documentação da API](../api/index.md)
3. Abra um [novo issue](https://github.com/Imobly/Documentation/issues/new)