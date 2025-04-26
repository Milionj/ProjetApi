# Projet API - Utilisateurs avec Node.js, Express & PostgreSQL

Ce projet est une API REST sécurisée développée en Node.js avec Express, utilisant PostgreSQL comme base de données. L'objectif est de gérer des utilisateurs via des opérations CRUD complètes, avec authentification par JWT.

## 🛠 Technologies utilisées

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JSON Web Token (JWT)
- bcrypt.js
- Docker / Docker Compose

## 🔐 Fonctionnalités

- Authentification (login avec token JWT)
- Inscription sécurisée (mot de passe hashé)
- Gestion des utilisateurs (CRUD)
- Architecture MVC
- Conteneurisation avec Docker

## 📦 Lancer le projet en local

### 1. Cloner le dépôt
```bash
git clone https://github.com/Milionj/ProjetApi.git
cd ProjetApi
docker-compose up --build
