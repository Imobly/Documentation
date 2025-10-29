# GitHub Pages Setup Guide

Este guia explica como ativar o GitHub Pages para hospedar a documentação do Imobly.

## 🚀 Ativando GitHub Pages

### Passo 1: Configurações do Repositório

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Role para baixo até encontrar **Pages** no menu lateral

### Passo 2: Configurar Source

1. Em **Source**, selecione **Deploy from a branch**
2. Em **Branch**, selecione **main**
3. Em **Folder**, deixe **/ (root)**
4. Clique em **Save**

### Passo 3: Aguardar Deploy

- O GitHub Pages vai automaticamente fazer o build
- Aguarde alguns minutos (normalmente 2-5 minutos)
- Você receberá uma URL como: `https://imobly.github.io/Documentation/`

## 📁 Estrutura Organizada

A documentação foi reorganizada da seguinte forma:

```
📚 Documentação Principal (/)
├── 🚀 Guias (/guides/)
│   ├── Getting Started
│   ├── Arquitetura
│   ├── Testing
│   └── Deploy
├── 📖 API Reference (/api/)
│   ├── Overview
│   ├── Propriedades
│   ├── Inquilinos
│   ├── Contratos
│   └── Pagamentos
└── 🔐 Autenticação (/auth/)
    ├── Overview
    ├── Endpoints
    ├── Configuração
    └── Deploy
```

## ✅ Melhorias Implementadas

### Organização
- ✅ Estrutura hierárquica clara
- ✅ Navegação intuitiva
- ✅ Breadcrumbs para localização
- ✅ Sidebar com links contextuais

### Funcionalidades
- ✅ Search enabled (busca)
- ✅ Mobile responsive
- ✅ Tema profissional (Just the Docs)
- ✅ Botão "Edit on GitHub" em cada página

### Conteúdo
- ✅ Duplicações removidas
- ✅ Informações consolidadas
- ✅ Links internos funcionais
- ✅ Diagramas organizados

## 🎨 Personalização

### Tema e Cores
- Tema base: Just the Docs
- Cores personalizadas definidas em `_config.yml`
- CSS adicional em `assets/css/main.scss`

### Componentes
- Header com navegação principal
- Sidebar contextual por seção
- Footer com links úteis
- Breadcrumb navigation

## 🔗 URLs da Documentação

Após ativar o GitHub Pages, a documentação estará disponível em:

- **Principal**: https://imobly.github.io/Documentation/
- **Guias**: https://imobly.github.io/Documentation/guides/
- **API**: https://imobly.github.io/Documentation/api/
- **Auth**: https://imobly.github.io/Documentation/auth/

## 📝 Como Contribuir

1. Edite os arquivos em `_guides/`, `_api/`, ou `_auth/`
2. Use o formato Markdown com front matter
3. Teste localmente com `bundle exec jekyll serve`
4. Faça commit e push - o GitHub Pages atualizará automaticamente

## 🆘 Troubleshooting

### Site não aparece
- Verifique se o GitHub Pages está ativado em Settings → Pages
- Confirme se não há erros de build na aba Actions

### Links quebrados
- Use caminhos relativos: `[texto](./pagina.md)`
- Para assets: `![img](../assets/images/exemplo.png)`

### Erro de build
- Verifique a sintaxe do YAML no front matter
- Confira se não há caracteres especiais nos nomes dos arquivos

---

**A documentação do Imobly agora está organizada e pronta para o GitHub Pages! 🎉**