
# 📋 Projet API - To Do List avec Node.js, Express & PostgreSQL

Ce projet est une API REST sécurisée développée en Node.js avec Express, utilisant PostgreSQL comme base de données.  
L'objectif est de permettre la gestion d'une To Do List pour des utilisateurs authentifiés, avec des opérations CRUD sécurisées et une authentification par JWT.

---

## 🛠 Technologies utilisées

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JSON Web Token (JWT)
- bcrypt.js
- Docker / Docker Compose

---

## 🔐 Fonctionnalités principales

- Authentification utilisateur (login avec token JWT)
- Inscription sécurisée (mot de passe hashé avec bcrypt)
- Gestion des utilisateurs (CRUD, rôles admin)
- Gestion des tâches (ToDos) (CRUD)
- Architecture MVC
- Sécurisation des routes avec JWT
- Conteneurisation avec Docker

---

## 📦 Lancer le projet en local

### 1. Cloner le dépôt
```bash
git clone https://github.com/Milionj/ProjetApi.git
cd ProjetApi
docker-compose up --build
```

---

# 🧠 Conception de la Base de Données avec Merise

---

## 📋 Règles de Gestion

- Un utilisateur est identifié par un identifiant unique (`id`).
- Chaque utilisateur possède un `username` unique et non vide.
- Chaque utilisateur possède un `email` unique et valide.
- Chaque utilisateur possède un `password` haché (bcrypt) et non vide.
- Certains utilisateurs peuvent être administrateurs (`is_admin`).
- Un utilisateur peut créer plusieurs tâches (ToDos).
- Chaque tâche possède :
  - un titre obligatoire (`title`),
  - une description facultative (`description`),
  - un statut obligatoire (`status`) : `pending`, `in_progress`, `completed`.
- Seul le créateur d'une tâche (ou un admin) peut modifier ou supprimer cette tâche.
- Le mot de passe n'est jamais retourné dans les réponses API.
- Les opérations CRUD sont protégées via JWT.

---

## 📑 Dictionnaire de Données

### Utilisateur (users)

| Attribut      | Description                           | Type             | Contraintes                              |
|:--------------|:--------------------------------------|:-----------------|:-----------------------------------------|
| id            | Identifiant unique                    | Entier           | Clé primaire, auto-incrémenté            |
| username      | Nom d'utilisateur                     | Chaîne (50)      | Non nul, unique                         |
| email         | Adresse email                         | Chaîne (100)     | Non nul, unique, format email           |
| password      | Mot de passe haché                     | Chaîne (255)     | Non nul                                 |
| is_admin      | Administrateur                        | Booléen          | Non nul, défaut FALSE                   |

### ToDo (todos)

| Attribut      | Description                           | Type             | Contraintes                              |
|:--------------|:--------------------------------------|:-----------------|:-----------------------------------------|
| id            | Identifiant unique                    | Entier           | Clé primaire, auto-incrémenté            |
| user_id       | Référence utilisateur                 | Entier           | Clé étrangère (users.id), non nul        |
| title         | Titre                                 | Chaîne (255)     | Non nul                                 |
| description   | Description                           | Texte            | Facultatif                              |
| status        | Statut                                | Chaîne (50)      | Non nul (valeurs possibles : pending, in_progress, completed) |

---

## 🧠 MCD (Modèle Conceptuel de Données)

**Entités :**
- Utilisateur
- ToDo

**Relations :**
- Un utilisateur peut créer plusieurs ToDos.
- Un ToDo appartient à un seul utilisateur.

---

## 🛠 MLD (Modèle Logique de Données)

- **Utilisateur**
  - id (PK)
  - username (unique, NOT NULL)
  - email (unique, NOT NULL)
  - password (NOT NULL)
  - is_admin (BOOLEAN, default FALSE)

- **ToDo**
  - id (PK)
  - user_id (FK → users.id, NOT NULL)
  - title (NOT NULL)
  - description (facultatif)
  - status (NOT NULL)

---

## 🧩 MPD (Modèle Physique de Données)

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending'
);
```

---

# ✅ Conclusion

Cette API propose une architecture sécurisée pour la gestion de tâches personnelles (ToDos) avec un système d'authentification utilisateur robuste, conforme aux standards Merise pour la conception de la base de données.

---
