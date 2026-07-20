# 🏥 MedIntel AI

An AI-Powered Clinical Document Intelligence Platform built using FastAPI, PostgreSQL, pgvector, and Large Language Models (LLMs).

MedIntel AI enables healthcare professionals to upload clinical documents, perform semantic search using Retrieval-Augmented Generation (RAG), and interact with medical documents through an AI-powered chat interface.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Role-based User Management

### 📄 Document Management
- Upload Clinical Documents (PDF)
- Store Document Metadata
- Background Document Processing
- PDF Text Extraction
- Document Chunking

### 🤖 AI & RAG Pipeline
- Embedding Generation
- Vector Storage using PostgreSQL + pgvector
- Semantic Similarity Search
- Retriever
- Context Builder
- Prompt Builder
- Retrieval-Augmented Generation (RAG)

### 🧠 Multi-LLM Support
- Ollama ✅
- OpenAI
- Azure OpenAI
- Google Gemini

### 💬 AI Chat
- Ask Questions from Uploaded Documents
- Chat Sessions
- Conversation History
- View Previous Conversations
- Delete Conversations

### 🗄 Database
- PostgreSQL
- Alembic Migrations
- SQLAlchemy ORM

### ⚙ Backend Architecture
- FastAPI
- Repository Pattern
- Service Layer
- Pydantic Schemas
- Exception Handling
- Logging

---

# 🏗 Project Architecture

```
                +--------------------+
                |      Frontend      |
                +---------+----------+
                          |
                          |
                     REST APIs
                          |
                          ▼
                +--------------------+
                |      FastAPI       |
                +---------+----------+
                          |
          +---------------+---------------+
          |                               |
          ▼                               ▼
   Service Layer                  Authentication
          |
          ▼
   Repository Layer
          |
          ▼
     PostgreSQL
          |
          ▼
      pgvector
          |
          ▼
Semantic Similarity Search
          |
          ▼
      Retriever
          |
          ▼
   Context Builder
          |
          ▼
   Prompt Builder
          |
          ▼
     LLM Manager
          |
  +-------+-------+-------+-------+
  |               |               |
 Ollama       OpenAI        Gemini
                  |
               Azure OpenAI
```

---

# 📂 Project Structure

```
MedIntel-AI
│
├── backend
│   ├── alembic
│   ├── app
│   │   ├── ai
│   │   ├── api
│   │   ├── core
│   │   ├── database
│   │   ├── dependencies
│   │   ├── exceptions
│   │   ├── handlers
│   │   ├── models
│   │   ├── prompts
│   │   ├── repositories
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   └── tests
│
├── frontend
│
├── docker
│
├── docs
│
├── screenshots
│
├── README.md
│
└── docker-compose.yml
```

---

# 🛠 Technology Stack

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- pgvector
- Alembic
- Pydantic

## AI

- Ollama
- OpenAI API
- Azure OpenAI
- Google Gemini

## Database

- PostgreSQL
- pgvector

## Others

- JWT Authentication
- REST APIs
- Logging
- Exception Handling

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/AbhishekSingaravel/MedIntel-AI.git
```

```bash
cd MedIntel-AI
```

---

## Backend Setup

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create

```
backend/.env
```

Example

```env
DATABASE_URL=
SECRET_KEY=

OPENAI_API_KEY=
AZURE_OPENAI_API_KEY=
OLLAMA_BASE_URL=
GEMINI_API_KEY=
```

---

## Run Alembic

```bash
alembic upgrade head
```

---

## Start Backend

```bash
uvicorn app.main:app --reload
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# 📌 API Modules

- Authentication
- Users
- Documents
- Retrieval
- Chat
- Health
- Configuration

---

# 🧠 AI Workflow

```
User Question
      │
      ▼
Retriever
      │
      ▼
pgvector Search
      │
      ▼
Relevant Chunks
      │
      ▼
Context Builder
      │
      ▼
Prompt Builder
      │
      ▼
LLM Manager
      │
      ▼
Selected LLM
      │
      ▼
Answer
```

---

# ✨ Implemented Features

- JWT Authentication
- User Management
- PDF Upload
- PDF Processing
- Chunking
- Embeddings
- Vector Search
- RAG
- Multi-LLM Support
- Conversation History
- Exception Handling
- Logging
- Alembic Migrations

---

# 🚧 Future Enhancements

- React Frontend
- Docker Deployment
- Source Citations
- Streaming Responses
- Unit Tests
- Cloud Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

**Abhishek Singaravel**

Backend Developer | AI Enthusiast

GitHub: https://github.com/AbhishekSingaravel

---

# ⭐ If you found this project useful, consider giving it a star!