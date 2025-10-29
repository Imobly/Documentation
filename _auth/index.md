---
layout: default
title: Autenticação
nav_order: 4
has_children: true
---

# 🔐 Sistema de Autenticação

Documentação completa do sistema de autenticação e autorização do Imobly.
{: .fs-6 .fw-300 }

## 🎯 Visão Geral

O sistema de autenticação foi implementado utilizando JWT (JSON Web Tokens) e segue as melhores práticas de segurança para garantir a proteção dos dados e controle de acesso.

## 📋 Conteúdo

- **[Overview](./overview)** - Visão geral e conceitos básicos
- **[Endpoints](./endpoints)** - APIs de autenticação
- **[Configuração](./config)** - Configurações do sistema
- **[Deploy](./deployment)** - Implantação em produção
- **[FAQ](./faq)** - Perguntas frequentes

## ✨ Características

- **JWT Stateless**: Tokens auto-contidos
- **Role-Based Access Control (RBAC)**: Controle granular
- **Password Security**: Hash bcrypt
- **Rate Limiting**: Proteção contra ataques
- **Token Refresh**: Renovação automática