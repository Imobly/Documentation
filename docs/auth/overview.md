# Auth Service — Visão Geral

Esta seção descreve o propósito do serviço de autenticação, seu contrato com outros serviços e decisões arquiteturais (JWT stateless, HS256, password hashing com bcrypt).

## Objetivos

- Emitir tokens JWT para clientes e outros serviços
- Validar credenciais de usuário e gerenciar contas
- Oferecer endpoints de administração para criação e gerenciamento de usuários

## Tokens

- Tipo: Bearer JWT
- Algoritmo: HS256
- Conteúdo mínimo: sub (user id), exp (expiration), scopes/roles
