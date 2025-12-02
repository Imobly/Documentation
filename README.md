# 🏢 Imobly Documentation

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://imobly.github.io/Documentation/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MkDocs](https://img.shields.io/badge/MkDocs-Material-blue.svg)](https://squidfunk.github.io/mkdocs-material/)

> Documentação oficial do sistema de gestão imobiliária Imobly, hospedada no GitHub Pages.

## 🌐 Acesso

- **Documentação:** [imobly.github.io/Documentation](https://imobly.github.io/Documentation/)
- **Frontend:** [imobly.onrender.com](https://imobly.onrender.com)
- **Backend API:** [backend-non0.onrender.com/docs](https://backend-non0.onrender.com/docs)
- **Auth API:** [auth-api-3zxk.onrender.com/docs](https://auth-api-3zxk.onrender.com/docs)

## ✨ Principais Funcionalidades

- 🏢 **Gestão de Propriedades** - Cadastro e gerenciamento completo
- 🏠 **Controle de Unidades** - Apartamentos, casas e espaços comerciais
- 👥 **Gerenciamento de Inquilinos** - Dados completos e histórico
- 📄 **Contratos Inteligentes** - Criação e acompanhamento automatizado
- 💰 **Sistema de Pagamentos** - Controle de recebimentos e inadimplência
- 💸 **Gestão de Despesas** - Controle de custos e manutenção
- 🔔 **Notificações** - Alertas automáticos e lembretes
- 📊 **Dashboard Analítico** - Métricas e relatórios em tempo real

## 🚀 Quick Start

### Com Docker (Recomendado)

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/imobly-backend.git
cd imobly-backend

# Configure o ambiente
cp .env.example .env

# Execute o projeto
docker-compose up --build -d

# Acesse a documentação
# http://localhost:8000/docs
```

### Instalação Local

```bash
# Instale as dependências
pip install -r requirements.txt

# Configure o banco de dados
alembic upgrade head

# Execute o servidor
uvicorn app.main:app --reload
```

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Layer     │    │   Database      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                      │                      │
         │                      │                      │
    Render.com            Render.com              Render.com
                                │
                       ┌─────────────────┐
                       │   File Storage  │
                       │   (Local/S3)    │
                       └─────────────────┘
```

### Hospedagem (Render)

- **Frontend (Next.js):** imobly.onrender.com
- **Backend API (FastAPI):** backend-non0.onrender.com
- **Auth API (FastAPI):** auth-api-3zxk.onrender.com
- **Database:** PostgreSQL (Render Managed)

### Camadas da Aplicação

- **API Layer** - Endpoints REST com FastAPI
- **Business Logic** - Controllers e Services
- **Data Access** - Repositories com SQLAlchemy
- **Domain Models** - Entidades e regras de negócio

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [Getting Started](GETTING_STARTED.md) | Guia completo de instalação e configuração |
| [API Documentation](API_DOCS.md) | Documentação completa da API REST |

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js** - Framework React para produção

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM avançado para Python
- **Pydantic** - Validação de dados com tipos
- **Alembic** - Migrações de banco de dados
- **Uvicorn** - Servidor ASGI de alta performance

### Database
- **PostgreSQL** - Banco de dados principal

### DevOps
- **Docker & Docker Compose** - Containerização
- **Render** - Plataforma de hosting em nuvem
- **Nginx** - Proxy reverso e servir arquivos estáticos
- **GitHub Actions** - CI/CD pipeline

## 📊 Modelagem

- **Diagrama UML:** [Ver diagramas](https://imobly.github.io/Documentation/diagrams/)
- **DDL Database:** [DDL.sql](docs/diagrams/DDL.sql)

### Estrutura do Banco (PostgreSQL)

O banco de dados possui 7 tabelas principais:
- `properties` - Propriedades imobiliárias
- `units` - Unidades dentro de propriedades
- `tenants` - Inquilinos
- `contracts` - Contratos de locação
- `payments` - Pagamentos e recebimentos
- `expenses` - Despesas das propriedades
- `notifications` - Sistema de notificações

## 🧪 Qualidade do Código

### Testes


### Code Quality


## 🔐 Segurança


## 📈 Performance

### Benchmarks


### Otimizações


## 🔄 Roadmap

### v1.0 (MVP) ✅
- [ ] CRUD básico de propriedades
- [ ] Gestão de inquilinos
- [ ] Sistema de contratos
- [ ] Controle de pagamentos

### v1.1 (2025)
- [ ] Dashboard analytics
- [ ] Relatórios PDF
- [ ] Notificações por email
- [ ] API de integração

### v1.2 (2025)
- [ ] App mobile
- [ ] Integração com bancos
- [ ] Sistema de manutenção
- [ ] Multi-tenancy

### v2.0 (2025)
- [ ] IA para análise de mercado
- [ ] Automação de contratos
- [ ] Portal do inquilino
- [ ] Marketplace de serviços

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

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 **Email:** devcostta@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/seu-usuario/imobly-backend/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/seu-usuario/imobly-backend/discussions)
- 📚 **Docs:** [Documentação Completa](https://docs.imobly.com)

## 🏆 Equipe

Desenvolvido com ❤️ pela equipe Imobly

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**