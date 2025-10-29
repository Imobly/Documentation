---
layout: default
title: Overview
parent: Autenticação
nav_order: 1
---

# 🔐 Auth Service — Visão Geral

Esta seção descreve o propósito do serviço de autenticação, seu contrato com outros serviços e decisões arquiteturais.
{: .fs-6 .fw-300 }

## 🎯 Objetivos

O sistema de autenticação do Imobly tem como principais objetivos:

- **Emitir tokens JWT** para clientes e outros serviços
- **Validar credenciais** de usuário e gerenciar contas
- **Oferecer endpoints de administração** para criação e gerenciamento de usuários
- **Controlar acesso** com base em roles e permissões

---

## 🎫 Tokens JWT

### Características
- **Tipo**: Bearer JWT
- **Algoritmo**: HS256 (HMAC SHA-256)
- **Tempo de vida**: 30 minutos (configurável)
- **Refresh Token**: 7 dias (configurável)

### Estrutura do Token

```json
{
  "sub": "123",           // User ID
  "email": "user@imobly.com",
  "name": "João Silva",
  "roles": ["admin"],
  "scopes": ["read", "write"],
  "exp": 1640995200,      // Expiration timestamp
  "iat": 1640991600,      // Issued at timestamp
  "jti": "unique-token-id"
}
```

### Headers Obrigatórios

```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

---

## 🏗️ Arquitetura de Segurança

### Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant Client
    participant AuthAPI
    participant Database
    participant JWT

    Client->>AuthAPI: POST /auth/login (email, password)
    AuthAPI->>Database: Validate user credentials
    Database-->>AuthAPI: User data
    AuthAPI->>JWT: Generate access token
    JWT-->>AuthAPI: JWT token
    AuthAPI-->>Client: { access_token, refresh_token }
    
    Client->>AuthAPI: Request with Authorization header
    AuthAPI->>JWT: Validate token
    JWT-->>AuthAPI: Token claims
    AuthAPI-->>Client: Protected resource
```

### Estrutura de Arquivos

```text
app/auth/
├── __init__.py
├── models.py          # Modelo User do SQLAlchemy
├── schemas.py         # Schemas Pydantic para validação
├── repository.py      # Repositório para operações de banco
├── controller.py      # Lógica de negócios
├── router.py          # Endpoints da API
├── security.py        # Funções de criptografia e JWT
├── dependencies.py    # Dependências FastAPI
└── middleware.py      # Middleware de autenticação
```

---

## 🛡️ Medidas de Segurança

### Hash de Senhas
- **Algoritmo**: bcrypt com salt aleatório
- **Rounds**: 12 (configurável)
- **Validação**: Força da senha obrigatória

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

### Rate Limiting
- **Login**: 5 tentativas por minuto por IP
- **Registro**: 3 registros por hora por IP
- **Refresh Token**: 10 renovações por hora

### Validações de Entrada
- **Email**: Formato válido e único
- **Senha**: Mínimo 8 caracteres, maiúscula, minúscula, número
- **Dados pessoais**: Sanitização contra XSS

---

## 👥 Sistema de Roles

### Roles Disponíveis

| Role | Descrição | Permissões |
|------|-----------|------------|
| `admin` | Administrador do sistema | Acesso total |
| `manager` | Gestor de propriedades | Criar/editar propriedades |
| `user` | Usuário básico | Visualizar dados próprios |
| `tenant` | Inquilino | Acesso limitado a contrato próprio |

### Scopes e Permissões

```json
{
  "admin": ["read", "write", "delete", "manage_users"],
  "manager": ["read", "write", "manage_properties"],
  "user": ["read", "write_own"],
  "tenant": ["read_own"]
}
```

---

## 🔄 Ciclo de Vida do Token

### Geração
1. **Login** → Validação de credenciais
2. **Claims** → Montagem dos dados do usuário
3. **Assinatura** → Geração do JWT com chave secreta
4. **Resposta** → Retorno do access_token e refresh_token

### Validação
1. **Header** → Verificação do formato Bearer
2. **Signature** → Validação da assinatura
3. **Expiration** → Verificação se não expirou
4. **Claims** → Extração dos dados do usuário

### Renovação
1. **Refresh Token** → Validação do token de renovação
2. **User Check** → Verificação se usuário ainda existe
3. **New Token** → Geração de novo access_token
4. **Response** → Retorno do novo token

---

## 🔧 Configurações

### Variáveis de Ambiente

```env
# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Security Settings
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOGIN_ATTEMPT_TIMEOUT=300  # 5 minutes

# Rate Limiting
RATE_LIMIT_LOGIN=5
RATE_LIMIT_REGISTER=3
RATE_LIMIT_REFRESH=10
```

### Configuração de Produção

```python
from pydantic import BaseSettings

class AuthSettings(BaseSettings):
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    bcrypt_rounds: int = 12
    
    class Config:
        env_file = ".env"

auth_settings = AuthSettings()
```

---

## 🧪 Testando a Autenticação

### Registro de Usuário

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@imobly.com",
    "password": "MinhaSenh@123",
    "full_name": "João Silva"
  }'
```

### Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@imobly.com",
    "password": "MinhaSenh@123"
  }'
```

### Usar Token Protegido

```bash
curl -X GET "http://localhost:8000/api/v1/users/me" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

---

## 🛠️ Implementação

### Dependência de Autenticação

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user(user_id)
    if user is None:
        raise credentials_exception
    
    return user
```

### Middleware de Autenticação

```python
@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    # Skip auth for public routes
    if request.url.path in ["/docs", "/health", "/auth/login"]:
        return await call_next(request)
    
    # Check for Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(
            status_code=401,
            content={"detail": "Authorization header missing"}
        )
    
    return await call_next(request)
```

---

## 📚 Próximos Passos

- **[Endpoints](./endpoints)** - Documentação detalhada das APIs
- **[Configuração](./config)** - Configurações avançadas
- **[Deploy](./deployment)** - Implantação em produção
- **[FAQ](./faq)** - Perguntas frequentes e troubleshooting