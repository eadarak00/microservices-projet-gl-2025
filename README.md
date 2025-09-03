# microservices-projet-gl-2025

## Description

Ce projet est une application microservices développée dans le cadre de la filière Génie Logiciel 2025.
Il utilise une architecture microservices avec les technologies suivantes :

* Spring Boot 3.3
* Eureka pour la découverte des services
* Config Server pour la configuration centralisée
* API Gateway (Spring Cloud Gateway)
* MongoDB comme base de données NoSQL (installation locale requise)
* GraphQL pour certaines API
* Communication interservices avec Feign et gRPC
* Frontend Angular (optionnel selon les besoins)

Le projet gère les entités **Étudiant** et **Classe**, avec leurs relations, et illustre la communication entre microservices.



## Structure du projet

| Module                | Description                                      |
| --------------------  | ------------------------------------------------ |
| ms-etudiant           | Microservice gestion des étudiants               |
| ms-classe             | Microservice gestion des classes                 |
| ms-register-server    | Serveur Eureka pour la découverte des services   |
| ms-config-server      | Serveur de configuration centralisée             |
| ms-gateway            | Gateway d’API pour centraliser les accès         |
| frontend-angular      | Application Angular consommant les microservices |



## Fonctionnalités principales

* Gestion CRUD des étudiants
* Gestion CRUD des classes
* Recherche avancée via GraphQL
* Découverte dynamique des services avec Eureka
* Configuration centralisée avec Spring Cloud Config
* Communication interservices via gRPC
* API Gateway pour router les appels
* Base de données MongoDB (installation locale requise)



## Prérequis

* Java 17+
* Maven 3.6+
* MongoDB installé localement et lancé (pas de Docker)
* Node.js (pour frontend Angular)
* Angular CLI (pour le frontend)


## Installation et démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/eadarak00/microservices-projet-gl-2025.git
cd microservices-projet-gl-2025
```

### 2. Lancer MongoDB localement

Assure-toi que MongoDB est installé et lancé sur ta machine (par exemple `mongod` en background).

### 3. Démarrer Config Server

```bash
cd ms-config-server
mvn spring-boot:run
```

### 4. Démarrer Eureka Server

```bash
cd ms-register-serveur
mvn spring-boot:run
```

### 5. Démarrer API Gateway

```bash
cd ms-gateway
mvn spring-boot:run
```

### 6. Démarrer les microservices

```bash
cd ms-etudiant
mvn spring-boot:run
```

```bash
cd ms-classe
mvn spring-boot:run
```



### 7. (Optionnel) Démarrer le frontend Angular

```bash
cd frontend-angular
npm install
ng serve --open
```

---

## Endpoints importants

* Eureka Dashboard : `http://localhost:8761`
* API Gateway : `http://localhost:8080/api`
* ms-etudiant API (exemple REST) : `http://localhost:9002/etudiants`
* ms-classe API (exemple REST) : `http://localhost:9001/classes`
* GraphQL endpoint (exemple) : `http://localhost:9002/graphql`

---

## Technologies utilisées

* Java 17
* Spring Boot 3.3
* Spring Cloud (Eureka, Config, Gateway)
* MongoDB
* GraphQL (Spring Boot starter)
* gRPC avec grpc-spring-boot-starter
* Angular 16
* Maven

## Auteurs

* El Hadji Abdou Drame
* Djiby FALL

