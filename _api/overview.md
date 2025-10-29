---
layout: default
title: Overview
parent: API
nav_order: 1
---

# 📚 API Overview

Introdução e conceitos básicos da API do Imobly.
{: .fs-6 .fw-300 }

## 🎯 Características Principais

- **RESTful**: Segue os princípios REST
- **OpenAPI**: Documentação automática
- **JSON**: Formato de dados padrão
- **JWT**: Autenticação baseada em tokens
- **Versionada**: Controle de versões (v1)

---

## 🌍 Base URL

```
https://api.imobly.com/api/v1
```

**Desenvolvimento:**
```
http://localhost:8000/api/v1
```

---

## 📋 Estrutura de Resposta

### Resposta de Sucesso

```json
{
  "id": 1,
  "name": "Edifício Central",
  "address": "Rua Principal, 123",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Resposta de Lista Paginada

```json
{
  "items": [
    {
      "id": 1,
      "name": "Propriedade 1"
    }
  ],
  "total": 50,
  "skip": 0,
  "limit": 10,
  "has_next": true
}
```

### Resposta de Erro

```json
{
  "detail": "Propriedade não encontrada",
  "error_code": "PROPERTY_NOT_FOUND",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header:

```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Obter token:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@imobly.com",
  "password": "senha123"
}
```

---

## 📊 Códigos de Status HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Autenticação necessária |
| 403 | Forbidden | Permissão insuficiente |
| 404 | Not Found | Recurso não encontrado |
| 422 | Unprocessable Entity | Erro de validação |
| 500 | Internal Server Error | Erro interno |

---

## 🔄 Paginação

Endpoints que retornam listas suportam paginação:

**Parâmetros:**
- `skip`: Número de registros para pular (padrão: 0)
- `limit`: Máximo de registros (padrão: 100, máx: 1000)

**Exemplo:**
```http
GET /api/v1/properties?skip=20&limit=10
```

---

## 🔍 Filtros e Busca

### Filtros Comuns

```http
# Filtrar por status
GET /api/v1/properties?status=occupied

# Filtrar por tipo
GET /api/v1/properties?type=apartment

# Filtrar por data
GET /api/v1/payments?start_date=2024-01-01&end_date=2024-01-31
```

### Busca por Texto

```http
# Buscar propriedades
GET /api/v1/properties?search=centro

# Buscar inquilinos
GET /api/v1/tenants?search=João Silva
```

---

## 📈 Rate Limiting

Limites de requisições por minuto:

- **Rotas públicas**: 100 req/min
- **Autenticação**: 5 req/min
- **Upload de arquivos**: 10 req/min
- **Relatórios**: 20 req/min

**Headers de resposta:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 🎨 Content Types

### Request Headers

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

### Upload de Arquivos

```http
Content-Type: multipart/form-data
```

---

## 📝 Exemplos de Uso

### Criar Nova Propriedade

```bash
curl -X POST "http://localhost:8000/api/v1/properties" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Edifício Novo",
    "address": "Rua Nova, 456",
    "type": "apartment",
    "total_units": 15,
    "owner_name": "Maria Santos",
    "owner_contact": "maria@email.com"
  }'
```

### Buscar Propriedades

```bash
curl -X GET "http://localhost:8000/api/v1/properties?skip=0&limit=10" \
  -H "Authorization: Bearer {token}"
```

### Atualizar Propriedade

```bash
curl -X PUT "http://localhost:8000/api/v1/properties/1" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Edifício Atualizado",
    "address": "Rua Atualizada, 789"
  }'
```

---

## 🐛 Tratamento de Erros

### Erro de Validação (422)

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### Erro de Negócio (400)

```json
{
  "detail": "Propriedade já possui inquilino ativo",
  "error_code": "PROPERTY_OCCUPIED",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🧪 Ambiente de Testes

### URLs de Teste

- **Local**: http://localhost:8000
- **Staging**: https://staging-api.imobly.com
- **Production**: https://api.imobly.com

### Dados de Teste

Usuário administrador para testes:
```json
{
  "email": "admin@imobly.com",
  "password": "admin123"
}
```

---

## 📚 Próximos Passos

- **[Autenticação](./authentication)** - Detalhes do sistema de auth
- **[Propriedades](./properties)** - API de propriedades
- **[Contratos](./contracts)** - API de contratos
- **[Pagamentos](./payments)** - API de pagamentos