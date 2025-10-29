---
layout: default
title: Home
description: "Documentação oficial do Imobly - Sistema completo de gestão imobiliária"
---

# Imobly Documentation

Sistema completo de gestão imobiliária moderno e escalável.

[Ver no GitHub](https://github.com/Imobly/Documentation)

---

## 🎯 Visão Geral

O **Imobly** é uma plataforma completa para gestão imobiliária que oferece controle total sobre propriedades, inquilinos, contratos, pagamentos e despesas através de uma interface moderna e intuitiva.

### ✨ Principais Funcionalidades

- **🏢 Gestão de Propriedades** - Cadastro e gerenciamento completo
- **🏠 Controle de Unidades** - Apartamentos, casas e espaços comerciais  
- **👥 Gerenciamento de Inquilinos** - Dados completos e histórico
- **📄 Contratos Inteligentes** - Criação e acompanhamento automatizado
- **💰 Sistema de Pagamentos** - Controle de recebimentos e inadimplência
- **💸 Gestão de Despesas** - Controle de custos e manutenção
- **🔔 Notificações** - Alertas automáticos e lembretes
- **📊 Dashboard Analítico** - Métricas e relatórios em tempo real

---

## 🚀 Quick Start

### Opção 1: Docker (Recomendado)

```bash
# Clone o projeto
git clone https://github.com/Imobly/imobly-backend.git
cd imobly-backend

# Configure o ambiente
cp .env.example .env

# Execute o projeto
docker-compose up --build -d
```

### Opção 2: Instalação Local

```bash
# Instale as dependências
pip install -r requirements.txt

# Configure o banco de dados
alembic upgrade head

# Execute o servidor
uvicorn app.main:app --reload
```

**Acesse:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Navegação da Documentação

### [Getting Started](guides/getting-started)
Guia completo de instalação e configuração inicial

### [API Reference](api/) 
Documentação completa da API REST

### [Autenticação](auth/)
Sistema de autenticação e autorização

### [Arquitetura](guides/architecture)
Visão detalhada da arquitetura do sistema

---

## 🛠️ Stack Tecnológica

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM avançado para Python
- **Pydantic** - Validação de dados com tipos
- **MySQL 8.0** - Banco de dados principal

### DevOps
- **Docker & Docker Compose** - Containerização
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Proxy reverso

---

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Layer     │    │   Database      │
│   (React/Vue)   │◄──►│   (FastAPI)     │◄──►│   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   File Storage  │
                       │   (Local/S3)    │
                       └─────────────────┘
```

---

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Convenções
- **Commits:** Conventional Commits
- **Branches:** feature/, fix/, docs/, refactor/
- **Code Style:** Black + Flake8
- **Testes:** Obrigatórios para novas features

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/Imobly/Documentation/blob/main/LICENSE) para mais detalhes.

---

## 📞 Suporte

- 📧 **Email:** devcostta@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/Imobly/Documentation/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Imobly/Documentation/discussions)

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**