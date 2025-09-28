# 📚 API Documentation - Imobly

## 🎯 Overview

A API do Imobly é construída com FastAPI e segue os padrões REST. Esta documentação cobre todos os endpoints disponíveis, schemas de dados e exemplos de uso.

## 🔐 Autenticação

### Authentication Schema
```json
{
  "token_type": "Bearer",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "expires_in": 1800
}
```

### Login Endpoint
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@imobly.com",
  "password": "senha123"
}
```

### Headers para Requests Autenticados
```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## 🏢 Properties API

### Get All Properties
```http
GET /api/v1/properties/?skip=0&limit=100
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Edifício Central",
    "address": "Rua Principal, 123",
    "type": "apartment",
    "total_units": 20,
    "available_units": 5,
    "owner_name": "João Silva",
    "owner_contact": "joao@email.com",
    "created_at": "2024-01-15T10:30:00",
    "updated_at": "2024-01-15T10:30:00"
  }
]
```

### Get Property by ID
```http
GET /api/v1/properties/{property_id}
Authorization: Bearer {token}
```

### Create Property
```http
POST /api/v1/properties/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Novo Edifício",
  "address": "Rua Nova, 456",
  "type": "apartment",
  "total_units": 15,
  "owner_name": "Maria Santos",
  "owner_contact": "maria@email.com"
}
```

### Update Property
```http
PUT /api/v1/properties/{property_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Edifício Atualizado",
  "address": "Rua Atualizada, 789"
}
```

### Delete Property
```http
DELETE /api/v1/properties/{property_id}
Authorization: Bearer {token}
```

## 🏠 Units API

### Get Units by Property
```http
GET /api/v1/properties/{property_id}/units
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "property_id": 1,
    "unit_number": "101",
    "floor": 1,
    "bedrooms": 2,
    "bathrooms": 1,
    "area": 65.5,
    "rent_amount": 1200.00,
    "status": "occupied",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

### Create Unit
```http
POST /api/v1/units/
Authorization: Bearer {token}
Content-Type: application/json

{
  "property_id": 1,
  "unit_number": "102",
  "floor": 1,
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 65.5,
  "rent_amount": 1200.00
}
```

## 👥 Tenants API

### Get All Tenants
```http
GET /api/v1/tenants/?skip=0&limit=100
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Carlos Oliveira",
    "email": "carlos@email.com",
    "phone": "11999999999",
    "document": "12345678901",
    "birth_date": "1990-05-15",
    "occupation": "Engenheiro",
    "income": 5000.00,
    "emergency_contact": "Ana Oliveira - 11888888888",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

### Create Tenant
```http
POST /api/v1/tenants/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Carlos Oliveira",
  "email": "carlos@email.com",
  "phone": "11999999999",
  "document": "12345678901",
  "birth_date": "1990-05-15",
  "occupation": "Engenheiro",
  "income": 5000.00,
  "emergency_contact": "Ana Oliveira - 11888888888"
}
```

## 📄 Contracts API

### Get All Contracts
```http
GET /api/v1/contracts/?skip=0&limit=100
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "property_id": 1,
    "unit_id": 1,
    "tenant_id": 1,
    "start_date": "2024-01-01",
    "end_date": "2024-12-31",
    "rent_amount": 1200.00,
    "deposit_amount": 1200.00,
    "payment_day": 5,
    "status": "active",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

### Create Contract
```http
POST /api/v1/contracts/
Authorization: Bearer {token}
Content-Type: application/json

{
  "property_id": 1,
  "unit_id": 1,
  "tenant_id": 1,
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "rent_amount": 1200.00,
  "deposit_amount": 1200.00,
  "payment_day": 5
}
```

## 💰 Payments API

### Get Payments by Contract
```http
GET /api/v1/contracts/{contract_id}/payments
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "contract_id": 1,
    "amount": 1200.00,
    "due_date": "2024-02-05",
    "payment_date": "2024-02-03",
    "status": "paid",
    "payment_method": "bank_transfer",
    "reference_month": "2024-02",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

### Create Payment
```http
POST /api/v1/payments/
Authorization: Bearer {token}
Content-Type: application/json

{
  "contract_id": 1,
  "amount": 1200.00,
  "due_date": "2024-02-05",
  "reference_month": "2024-02"
}
```

### Update Payment Status
```http
PATCH /api/v1/payments/{payment_id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "paid",
  "payment_date": "2024-02-03",
  "payment_method": "bank_transfer"
}
```

## 💸 Expenses API

### Get Expenses by Property
```http
GET /api/v1/properties/{property_id}/expenses
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "property_id": 1,
    "description": "Manutenção elevador",
    "amount": 500.00,
    "category": "maintenance",
    "date": "2024-01-20",
    "receipt_url": "/uploads/receipts/receipt_001.pdf",
    "created_at": "2024-01-20T14:30:00"
  }
]
```

### Create Expense
```http
POST /api/v1/expenses/
Authorization: Bearer {token}
Content-Type: application/json

{
  "property_id": 1,
  "description": "Manutenção elevador",
  "amount": 500.00,
  "category": "maintenance",
  "date": "2024-01-20"
}
```

## 🔔 Notifications API

### Get User Notifications
```http
GET /api/v1/notifications/?skip=0&limit=50
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Pagamento em atraso",
    "message": "O pagamento do contrato #123 está em atraso há 5 dias.",
    "type": "payment_due",
    "priority": "high",
    "read": false,
    "created_at": "2024-01-25T09:00:00"
  }
]
```

### Mark Notification as Read
```http
PATCH /api/v1/notifications/{notification_id}/read
Authorization: Bearer {token}
```

## 📊 Dashboard API

### Get Dashboard Overview
```http
GET /api/v1/dashboard/overview
Authorization: Bearer {token}
```

**Response:**
```json
{
  "total_properties": 5,
  "total_units": 50,
  "occupied_units": 45,
  "total_tenants": 45,
  "monthly_revenue": 54000.00,
  "pending_payments": 3,
  "overdue_payments": 1,
  "recent_activities": [
    {
      "type": "payment_received",
      "description": "Pagamento recebido - Contrato #123",
      "timestamp": "2024-01-25T14:30:00"
    }
  ]
}
```

### Get Financial Summary
```http
GET /api/v1/dashboard/financial?start_date=2024-01-01&end_date=2024-01-31
Authorization: Bearer {token}
```

**Response:**
```json
{
  "period": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "total_revenue": 54000.00,
  "total_expenses": 5400.00,
  "net_income": 48600.00,
  "payment_stats": {
    "paid": 45,
    "pending": 3,
    "overdue": 1
  },
  "expense_categories": {
    "maintenance": 2500.00,
    "utilities": 1500.00,
    "administration": 1400.00
  }
}
```

## 📋 Data Schemas

### Property Schema
```json
{
  "id": "integer",
  "name": "string (required, max 255)",
  "address": "string (required)",
  "type": "enum: apartment, house, commercial (required)",
  "total_units": "integer (required, min 1)",
  "available_units": "integer (calculated)",
  "owner_name": "string (required, max 255)",
  "owner_contact": "string (required, max 255)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Tenant Schema
```json
{
  "id": "integer",
  "name": "string (required, max 255)",
  "email": "string (required, valid email)",
  "phone": "string (required, max 20)",
  "document": "string (required, max 20, unique)",
  "birth_date": "date",
  "occupation": "string (max 255)",
  "income": "decimal (min 0)",
  "emergency_contact": "string (max 500)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Contract Schema
```json
{
  "id": "integer",
  "property_id": "integer (required, foreign key)",
  "unit_id": "integer (required, foreign key)",
  "tenant_id": "integer (required, foreign key)",
  "start_date": "date (required)",
  "end_date": "date (required)",
  "rent_amount": "decimal (required, min 0)",
  "deposit_amount": "decimal (min 0)",
  "payment_day": "integer (1-31)",
  "status": "enum: active, expired, terminated (default: active)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## 🚨 Error Responses

### Standard Error Format
```json
{
  "detail": "Error message",
  "error_code": "SPECIFIC_ERROR_CODE",
  "timestamp": "2024-01-25T15:30:00"
}
```

### Common HTTP Status Codes
- **200 OK** - Successful request
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **422 Unprocessable Entity** - Validation error
- **500 Internal Server Error** - Server error

### Validation Error Format
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

## 📝 Rate Limiting

- **Standard endpoints:** 100 requests/minute
- **Authentication:** 5 requests/minute
- **File uploads:** 10 requests/minute

## 🔄 Pagination

### Query Parameters
- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum number of records (default: 100, max: 1000)

### Response Format
```json
{
  "items": [...],
  "total": 250,
  "skip": 0,
  "limit": 100,
  "has_next": true
}
```

---

*Esta documentação é atualizada automaticamente com cada release da API. Para dúvidas, consulte a documentação interativa em `/docs`.*