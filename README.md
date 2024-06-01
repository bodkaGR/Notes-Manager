# Notes Manager App

--- 

This is a simple web application that allows users to create and manage their notes. It is built using Spring Boot as the backend and React as the frontend. 

---

## Getting started

### Prerequisites

	- Java 20 or higher
	- Node.js and npm
	- Docker Desktop
	- Cypress
	- MySQL

---

## Installation

#### Clone git repository:

	`git clone https://github.com/bodkaGR/Notes-Manager.git`

---

## To run backend

1. Move to project directory of backend:

```bash
cd ./backend/NotesManager
```

2. Run your Docker Desktop:

```bash
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

3. Run the backend:

```bash
./mvnw spring-boot:run
```

---

## To run frontend:

1. Move to project directory of frontend:

```bash
cd ./frontend/notes_manager
```

2. Install frontend dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm run start
```

4. Access the application:

Open [http://localhost:3000](http://localhost:3000) in your web browser.

## To run frontend tests

1. Move to project directory of frontend:

```bash
cd ./frontend/notes_manager
```

2. Run Cypress:

```bash
npx cypress open
```

3. Select E2E Testing

4. Select firstTest

# Usage

---

	- Creating new notes
	- Updating existing notes
	- Choosing note by id
	- Deleting existing note
	- Switching between languages

