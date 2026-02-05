# 🐾 Pet & Tutor

Aplicação web construída com **React + Vite**, utilizada para gerenciar **pets e seus respectivos tutores**.  
Permite listagem, busca, paginação, cadastro, edição, detalhamento de registros e vínculo entre pets e tutores, com autenticação baseada em token.

O projeto foi desenvolvido seguindo boas práticas de **arquitetura em camadas**, componentização e testes unitários, conforme solicitado no desafio técnico.

---

## 🚀 Funcionalidades

### Pets
- Listagem de pets com paginação (10 por página)
- Busca por nome
- Detalhamento do pet
- Cadastro e edição
- Upload de foto
- Exibição do tutor vinculado (quando existir)

### Tutores
- Cadastro e edição de tutores
- Upload de foto
- Listagem de pets vinculados
- Vincular e remover pets

### Autenticação
- Login via API
- Gerenciamento de expiração e refresh de token

---

## 🧱 Arquitetura

O projeto adota uma **arquitetura em camadas**, com foco em separação de responsabilidades:

- **API layer**: comunicação HTTP (Axios)
- **Server State**: React Query (cache, paginação, refetch)
- **Client State**: Zustand (substituindo BehaviorSubject de forma idiomática em React)
- **Facade (ViewModel)**: hooks que orquestram regras de negócio e expõem uma interface simples para a UI
- **UI**: componentes desacoplados de regras e infraestrutura

---

## 🛠 Tecnologias e Bibliotecas

### Core
- **React 19**
- **Vite**
- **TypeScript**

### Roteamento e Estado
- **React Router DOM** – roteamento e lazy loading de módulos
- **React Query (TanStack Query)** – gerenciamento de estado do servidor
- **Zustand** – estado global do cliente (sessão, dados compartilhados)

### UI e Formulários
- **Tailwind CSS** – estilização e layout responsivo
- **Mantine** – componentes de formulário e modais (uso pontual)
- **React Hook Form** – gerenciamento e validação de formulários

### Qualidade e Testes
- **Vitest** – testes unitários
- **ESLint** – linting
- **Prettier** – formatação de código
- **Husky** – hooks de pré-commit
- **React Test Library**  

---

## 📦 Como rodar o projeto

### 1. Pré-requisitos
- Node.js (18+)
- npm ou yarn

### 2. Clonar o repositório

```bash
git clone https://github.com/matheusfellipe/matheusfellipeferreiradasilvaxavier052721
cd test-pet

### 3. Buildar aplicação em container
docker compose up --build -d


### 4. Acessar a aplicação

Após subir os containers, abra seu navegador e clique no link abaixo:

[Open Rede Busca](http://localhost:3000)