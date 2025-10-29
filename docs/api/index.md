# API Reference

Esta seção contém a documentação completa da API REST do Imobly.

## Visão Geral

A API do Imobly é uma RESTful API construída com FastAPI que oferece endpoints para gerenciar propriedades, inquilinos, contratos e pagamentos.

### Base URL

    https://api.imobly.com/api/v1

### Versionamento

A API usa versionamento por URL. A versão atual é `v1`.

### Formato de Resposta

Todas as respostas da API são em formato JSON:

    {
      "success": true,
      "data": {},
      "message": "Operação realizada com sucesso"
    }

## Autenticação

A API usa autenticação JWT (JSON Web Token). Para acessar endpoints protegidos, inclua o token no header:

    Authorization: Bearer <token>

### Endpoints de Autenticação

- **POST** `/auth/register` - Registrar novo usuário
- **POST** `/auth/login` - Fazer login
- **POST** `/auth/refresh` - Renovar token
- **POST** `/auth/logout` - Fazer logout

## Recursos Principais

### 🏠 Properties (Propriedades)

Gerenciamento de propriedades imobiliárias.

- **GET** `/properties` - Listar propriedades
- **POST** `/properties` - Criar propriedade
- **GET** `/properties/{id}` - Obter propriedade
- **PUT** `/properties/{id}` - Atualizar propriedade
- **DELETE** `/properties/{id}` - Deletar propriedade

### 👤 Tenants (Inquilinos)

Gerenciamento de inquilinos.

- **GET** `/tenants` - Listar inquilinos
- **POST** `/tenants` - Criar inquilino
- **GET** `/tenants/{id}` - Obter inquilino
- **PUT** `/tenants/{id}` - Atualizar inquilino
- **DELETE** `/tenants/{id}` - Deletar inquilino

### 📝 Contracts (Contratos)

Gerenciamento de contratos de locação.

- **GET** `/contracts` - Listar contratos
- **POST** `/contracts` - Criar contrato
- **GET** `/contracts/{id}` - Obter contrato
- **PUT** `/contracts/{id}` - Atualizar contrato
- **DELETE** `/contracts/{id}` - Deletar contrato

### 💰 Payments (Pagamentos)

Gerenciamento de pagamentos e recebimentos.

- **GET** `/payments` - Listar pagamentos
- **POST** `/payments` - Registrar pagamento
- **GET** `/payments/{id}` - Obter pagamento
- **PUT** `/payments/{id}` - Atualizar pagamento

## Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido ou ausente |
| 403 | Forbidden - Sem permissão para acessar |
| 404 | Not Found - Recurso não encontrado |
| 422 | Validation Error - Erro de validação |
| 500 | Internal Server Error - Erro interno |

## Paginação

Para endpoints que retornam listas, use os parâmetros:

- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máximo: 100)

Exemplo:

    GET /properties?page=2&limit=20

## Filtros e Busca

Muitos endpoints suportam filtros via query parameters:

- `search` - Busca por texto
- `status` - Filtrar por status
- `created_at_start` - Data de início
- `created_at_end` - Data de fim

Exemplo:

    GET /properties?search=apartamento&status=active

## Rate Limiting

A API tem limite de taxa de 100 requisições por minuto por IP.

Headers de resposta incluem:

- `X-RateLimit-Limit` - Limite total
- `X-RateLimit-Remaining` - Requisições restantes
- `X-RateLimit-Reset` - Timestamp do reset

## Exemplos de Uso

### Criar uma Propriedade

**Requisição:**

    POST /api/v1/properties
    Content-Type: application/json
    Authorization: Bearer <token>
    
    {
      "name": "Apartamento Centro",
      "address": "Rua das Flores, 123",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01234-567",
      "property_type": "apartment",
      "rooms": 2,
      "bathrooms": 1,
      "area": 60.5,
      "rent_value": 1500.00
    }

**Resposta:**

    {
      "success": true,
      "data": {
        "id": 1,
        "name": "Apartamento Centro",
        "address": "Rua das Flores, 123",
        "city": "São Paulo",
        "state": "SP",
        "zip_code": "01234-567",
        "property_type": "apartment",
        "rooms": 2,
        "bathrooms": 1,
        "area": 60.5,
        "rent_value": 1500.00,
        "status": "available",
        "created_at": "2024-01-01T10:00:00Z"
      },
      "message": "Propriedade criada com sucesso"
    }

### Listar Propriedades

**Requisição:**

    GET /api/v1/properties?page=1&limit=10&status=available

**Resposta:**

    {
      "success": true,
      "data": {
        "items": [
          {
            "id": 1,
            "name": "Apartamento Centro",
            "address": "Rua das Flores, 123",
            "rent_value": 1500.00,
            "status": "available"
          }
        ],
        "total": 25,
        "page": 1,
        "pages": 3,
        "limit": 10
      },
      "message": "Propriedades listadas com sucesso"
    }

## SDKs e Bibliotecas

### Python

    pip install imobly-python-sdk

    from imobly import ImoblyClient
    
    client = ImoblyClient(api_key="your-api-key")
    properties = client.properties.list()

### JavaScript/Node.js

    npm install imobly-js-sdk

    import { ImoblyClient } from 'imobly-js-sdk';
    
    const client = new ImoblyClient({ apiKey: 'your-api-key' });
    const properties = await client.properties.list();

## Changelog

### v1.2.0 (2024-01-15)
- Adicionado endpoint de relatórios
- Melhorias na paginação
- Novos filtros para propriedades

### v1.1.0 (2023-12-01)
- Sistema de notificações
- Webhooks para eventos
- Melhorias na performance

### v1.0.0 (2023-10-01)
- Lançamento inicial da API
- Endpoints básicos para CRUD
- Sistema de autenticação JWT

## Suporte

Para dúvidas sobre a API:

- **Documentação Interativa:** `/docs`
- **Email:** api-support@imobly.com
- **GitHub Issues:** [Reportar Bug](https://github.com/Imobly/Documentation/issues)