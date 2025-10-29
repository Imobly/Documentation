# 🚀 Como Ativar GitHub Pages - Passo a Passo

## ❗ IMPORTANTE: Siga estes passos exatamente

### Passo 1: Acesse as Configurações do Repositório

1. Vá para: **https://github.com/Imobly/Documentation**
2. Clique na aba **Settings** (no topo da página)
3. No menu lateral esquerdo, procure e clique em **Pages**

### Passo 2: Configurar o GitHub Pages

Na seção **Source**:

1. **Source**: Selecione **"Deploy from a branch"**
2. **Branch**: Selecione **"main"** 
3. **Folder**: Deixe **"/ (root)"**
4. Clique no botão **"Save"**

### Passo 3: Aguardar o Deploy

- Aparecerá uma mensagem: "GitHub Pages source saved"
- Aguarde 2-5 minutos para o primeiro build
- Recarregue a página de Settings → Pages
- Você verá uma mensagem verde: "Your site is published at https://imobly.github.io/Documentation/"

### Passo 4: Verificar se Funcionou

Acesse: **https://imobly.github.io/Documentation/**

Se ainda não funcionar, verifique:

1. **Actions**: Vá para a aba "Actions" do repositório e veja se há erros de build
2. **Aguarde mais**: Às vezes demora até 10 minutos na primeira vez
3. **Force refresh**: Pressione Ctrl+F5 para forçar o reload da página

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