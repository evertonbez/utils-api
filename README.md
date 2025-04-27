# API Utils Everton

API desenvolvida com Cloudflare Workers utilizando Hono e TypeScript, oferecendo endpoints para processamento de IA e outras coisas.

## 🚀 Tecnologias

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/) - Framework web rápido e leve
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) - Validação de esquemas
- [OpenAPI](https://www.openapis.org/) - Documentação da API

## 📋 Pré-requisitos

- Node.js (versão recomendada: 18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Conta no Cloudflare

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd api-cfworkers
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.dev.vars` na raiz do projeto com suas variáveis de ambiente.

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento na porta 3002
- `npm run deploy`: Faz deploy para o ambiente de desenvolvimento
- `npm run deploy:prod`: Faz deploy para o ambiente de produção

## 📚 Documentação da API

A documentação da API está disponível em:

- Swagger UI: `/openapi`
- Scalar API Reference: `/`

## 🏗️ Estrutura do Projeto

```
src/
├── common/
│   └── bindings.ts
├── middlewares/
│   ├── auth.ts
│   ├── logging.ts
│   └── security.ts
├── routes/
│   ├── ai/
│   └── health/
└── index.ts
```

## 🔒 Middlewares

- **Auth Middleware**: Autenticação de requisições
- **Logging Middleware**: Registro de logs
- **Security Middleware**: Medidas de segurança

## 📝 Rotas Disponíveis

- `/health`: Endpoints para monitoramento de saúde
- `/ai`: Endpoints para processamento de IA

## 🔐 Segurança

A API utiliza autenticação Bearer Token. Para acessar os endpoints protegidos, inclua o token no header:

```
Authorization: Bearer seu_token
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
