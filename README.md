# LumioHub

LumioHub e um hub digital que conecta pessoas autistas, familias e profissionais por meio de triagens confiaveis, conteudos curados e uma rede acolhedora de apoio. O projeto apresenta uma experiencia acessivel com fluxos guiados, painel autenticado e biblioteca de recursos.

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/raphasparda/LumioHub.git
cd LumioHub

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

A aplicação abrirá em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
```

Gera uma build otimizada na pasta `build/`

## 📦 Tecnologias

- React 19
- TypeScript
- React Router v7
- CSS Modules

## 🌐 Deploy Automático - Vercel

Este projeto está configurado para deploy automático na Vercel!

### Como funciona:

1. **Conectar ao GitHub**: Acesse [https://vercel.com/new](https://vercel.com/new)
2. **Importar repositório**: Selecione `raphasparda/LumioHub`
3. **Configurar variáveis de ambiente**:
   - Crie um arquivo `.env.production` na Vercel com suas variáveis
   - Veja `.env.example` para referência
4. **Deploy automático**: A cada push para `master`, a Vercel fará o deploy automaticamente!

### Variáveis de Ambiente (Vercel Dashboard)

```
REACT_APP_API_URL=sua_url_api_aqui
```

Você pode adicionar mais variáveis conforme necessário no dashboard da Vercel.

## 📝 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── context/       # React Context
├── data/          # Dados/Database
├── routes/        # Configuração de rotas
├── styles/        # Estilos globais
├── utils/         # Utilitários
└── types.ts       # Tipos TypeScript
```

## 🧪 Testes

```bash
npm test
```

## 👨‍💻 Desenvolvido por

Raphael Sparda