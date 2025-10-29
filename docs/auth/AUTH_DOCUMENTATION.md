# Sistema de Autenticação - Imóvel Gestão API

## Visão Geral

O sistema de autenticação foi implementado utilizando JWT (JSON Web Tokens) e segue as melhores práticas de segurança.

## Arquitetura

### Estrutura de Arquivos

```
app/src/auth/
├── __init__.py
├── models.py          # Modelo User do SQLAlchemy
├── schemas.py         # Schemas Pydantic para validação
├── repository.py      # Repositório para operações de banco de dados
├── controller.py      # Lógica de negócios
├── router.py          # Endpoints da API
├── security.py        # Funções de criptografia e JWT
├── dependencies.py    # Dependências FastAPI (get_current_user, etc)
└── middleware.py      # Middleware de autenticação (opcional)
```

## Endpoints

### 1. Registro de Usuário

**POST** `/api/v1/auth/register`

Registrar novo usuário no sistema.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "username": "usuario123",
  "password": "senha123",
  "full_name": "Nome Completo"
}
```

(Conteúdo resumido para apresentação; use o arquivo completo no repo `Auth-api` para detalhes)
