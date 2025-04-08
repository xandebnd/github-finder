# GitHub Finder 🔍

Uma aplicação feita com **Next.js**, **TypeScript** e **Tailwind CSS** que permite buscar perfis de usuários do GitHub e visualizar seus repositórios públicos.

## ✨ Funcionalidades

- 🔍 Buscar usuário do GitHub por nome
- 📂 Exibir informações do perfil (nome, bio, localidade, avatar)
- 📦 Listar todos os repositórios públicos
- ❌ Tratamento de erros (usuário não encontrado ou rate limit)
- 🚀 Animações com Framer Motion
- 🔐 Proxy com API interna (`/api/github`) para contornar rate-limit

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GitHub REST API](https://docs.github.com/en/rest)

## 🧪 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/github-finder.git

# Acesse a pasta do projeto
cd github-finder

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura

```
/components      # Componentes reutilizáveis
/pages           # Rotas e API
/styles          # Estilos globais
/public          # Imagens e favicon
```

## 🔒 API Proxy

Este projeto inclui uma rota interna (`/api/github`) para lidar com chamadas à API do GitHub, evitando bloqueios por excesso de requisições (rate limit).

## 👨‍💻 Desenvolvido por

Alexandre Bandeira  
[GitHub](https://github.com/xandebnd) • [LinkedIn](https://linkedin.com/in/xandebnd)

---

© 2025 Alexandre Bandeira. Todos os direitos reservados.
