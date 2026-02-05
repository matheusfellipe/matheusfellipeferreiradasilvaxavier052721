# 🐾 Pet & Tutor

Aplicação web construída com **React + Vite**, utilizada para gerenciar **pets e seus respectivos tutores**.  
Permite listagem, busca, paginação, cadastro, edição, detalhamento de registros e vínculo entre pets e tutores, com autenticação baseada em token.

O projeto foi desenvolvido seguindo boas práticas de **arquitetura em camadas**, componentização e testes unitários.

---

## 🚀 Funcionalidades

### Pets
- ✅ Listagem de pets com paginação (10 por página)
- ✅ Busca por nome e raça com debounce (500ms)
- ✅ Detalhamento completo do pet
- ✅ Cadastro e edição com validação
- ✅ Upload e remoção de foto
- ✅ Exibição do tutor vinculado (quando existir)

### Tutores
- ✅ Cadastro e edição de tutores com validação
- ✅ Upload e remoção de foto
- ✅ Listagem de pets vinculados
- ✅ Vincular e remover pets
- ✅ Máscaras para telefone e CPF

### Autenticação
- ✅ Login via API com validação
- ✅ Gerenciamento automático de expiração de token
- ✅ Refresh token automático
- ✅ Proteção de rotas privadas

---

## 🧱 Arquitetura

O projeto adota uma **arquitetura em camadas**, com foco em separação de responsabilidades e manutenibilidade:

### Estrutura de Camadas

**API Layer** (`shared/http/api.ts`)
- Cliente Axios configurado com interceptors
- Gerenciamento automático de tokens (Bearer)
- Refresh token automático em caso de 401
- Redirecionamento para login quando necessário

**Service Layer** (`app/*/services`)
- Encapsulamento das chamadas HTTP
- Transformação de dados da API
- Tratamento de erros específicos

**Server State** (React Query)
- Cache inteligente de dados remotos
- Sincronização reativa entre componentes
- Paginação e invalidação automática
- Controle de staleness e refetch
- React Query atua como fonte única de verdade para dados do servidor

**Facade/ViewModel** (`app/*/useFacade`)
- Hooks que orquestram lógica de negócio
- Debounce de buscas (500ms)
- Gerenciamento de paginação
- Interface simplificada para a UI
- Abstração de complexidade

**UI Components**
- Componentes desacoplados de lógica de negócio
- Reutilizáveis e testáveis
- Responsivos (mobile-first)
- Accessíveis

### Lazy Loading
Todas as páginas principais utilizam `React.lazy()` para code-splitting automático, melhorando o tempo de carregamento inicial.

---

## 🛠 Tecnologias e Bibliotecas

### Core
- **React 19**
- **Vite**
- **TypeScript**

### Roteamento e Estado
- **React Router DOM** – roteamento e lazy loading de módulos
- **React Query (TanStack Query)** – gerenciamento de estado do servidor


### UI e Formulários
- **Tailwind CSS** – estilização e layout responsivo (mobile-first)
- **Mantine** – componentes UI (forms, modals, tables, pagination)
- **React Hook Form** – gerenciamento de formulários com validação
- **Zod** – validação de schema TypeScript-first
- **React IMask** – máscaras para telefone e CPF

### Qualidade e Testes
- **Vitest** – testes unitários
- **ESLint** – linting
- **Prettier** – formatação de código
- **Husky** – hooks de pré-commit
- **React Testing Library** – testes de componentes

#### Estratégia de Testes

Os testes foram aplicados estrategicamente nos **componentes críticos** da aplicação:

**Componentes Testados (10 arquivos de teste):**
- ✅ **Autenticação** (`useAuth.test.tsx`) - Hook de autenticação e gerenciamento de token
- ✅ **Formulários** (`PetForm.test.tsx`, `TutorForm.test.tsx`) - Validação, submissão e upload de fotos
- ✅ **Listas e Cards** (`PetGrid.test.tsx`, `PetCard.test.tsx`, `TutorList.test.tsx`, `TutorCard.test.tsx`) - Renderização de dados e interações
- ✅ **Filtros e Busca** (`FilterSection.test.tsx`, `PetsSection.test.tsx`) - Funcionalidades de busca com debounce
- ✅ **Login** (`LoginPage.test.tsx`) - Fluxo de autenticação

**Cobertura Focada:**
- Componentes reutilizáveis e de alta complexidade
- Lógica de negócio crítica (autenticação, formulários)
- Interações do usuário (cliques, submissões, buscas)
- Renderização condicional e estados de loading/erro

**Executar Testes:**
```bash
# Modo watch (desenvolvimento)
npm test

# Execução única (CI/CD)
npm run test:ci
```

**Integração com Docker:**
Os testes são executados automaticamente durante o build do Docker, garantindo que apenas código validado seja containerizado.

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

[Open Meet Tutors](http://localhost:3000)

### 5. Acesso
Username: admin
Senha: admin