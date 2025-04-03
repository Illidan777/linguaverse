# Lingμverse - Back-End (Java, Spring)

Lingμverse back-end API is a basic CRUD API designed to serve the needs of the front-end React application. The primary focus of this project was on learning and solidifying front-end skills, particularly with React. However, the back-end is implemented using Java, Spring Boot, and related technologies to support the full-stack application.

## Table of Contents

1. [Project Structure](#project-structure)
    - [api](#1-api)
    - [config](#2-config)
    - [domain](#3-domain)
    - [mapper](#4-mapper)
    - [repository](#5-repository)
    - [services](#6-services)
    - [utils](#7-utils)
    - [resources](#8-resources)

2. [Key Features](#key-features)

3. [How to Set Up and Run](#how-to-set-up-and-run)
    - [Prerequisites](#prerequisites)
    - [Manual Quick Start](#manual-quick-start)

4. [Test the API](#test-the-api)

5. [Development Approach](#development-approach)
    - [Modular Architecture](#modular-architecture)
    - [Separation of Concerns](#separation-of-concerns)
    - [Basic CRUD Operations](#basic-crud-operations)
    - [Database Integration](#database-integration)
    - [Error Handling](#error-handling)


## Project Structure

The project is organized in a modular way, where each folder and file serves a specific purpose in the overall application architecture:

### 1. `api`
This folder contains the core of the application:
- **Controllers**: Defines the endpoints for handling client requests.
- **Global Exception Handler**: Handles global exceptions and provides proper responses for errors across the application.

### 2. `config`
The `config` folder contains configuration files for various application settings. Currently, it includes:
- **CORS Configurations**: Manages Cross-Origin Resource Sharing settings to enable communication between the front-end and back-end.

### 3. `domain`
This folder contains:
- **Entities**: Defines database entities that map to the corresponding tables.
- **DTOs**: Data Transfer Objects for communication between the API and the front-end.
- **API Requests**: Defines the structure of incoming requests to the API.
- **Enums**: Enumerations used across the application.
- **Exceptions**: Custom exceptions for handling errors in business logic or database operations.

### 4. `mapper`
In this folder, you will find mappers specific to business modules. These mappers are responsible for converting between domain models and DTOs.

### 5. `repository`
This folder contains JPA repositories for database access. The repositories provide CRUD operations and queries for interacting with the database.

### 6. `services`
This folder contains the core business logic of the application. Services interact with the repository layer to perform actions like fetching, saving, updating, or deleting data.

### 7. `utils`
Contains utility classes that help with common tasks throughout the application. For example:
- **Date Utils**: Utility class for handling date-related operations.

### 8. `resources`
The `resources` folder contains configuration files, including:
- **application.properties**: Configuration for database connection, CORS settings, and other application-level configurations.

## Key Features

- **CRUD Operations**: The API provides basic CRUD functionality for managing data in the application.
- **CORS Support**: Configured to allow communication with the front-end React app.
- **Exception Handling**: Global exception handling is implemented to catch and respond to errors appropriately.
- **Database Integration**: The API is integrated with a PostgreSQL database using Spring Data JPA.

## How to Set Up and Run

### Prerequisites
- Java 17 or higher
- Maven for building the project
- PostgreSQL running for the database connection

### Manual quick start
> Follow next instructions to set up local env for start development.

1. Install docker.


2. Start PostgreSQL DB in Docker using next command:
```
docker run --name postgres -e POSTGRES_PASSWORD=1234567 -e POSTGRES_USER=postgres -p 5432:5432 -d postgres:11.2
```

3. Make sure that containers up using next command:
```
docker container ls
```

4. Verify successful build using next command:

```
mvn clean install
```

5. Go to project sub-folder that you want to start and start app using next command or Run using Intellij Idea:

```
mvn spring-boot:run
``` 

## Test the API

The API endpoints can be accessed via the front-end application. The back-end will provide necessary responses based on the routes exposed by the controllers.

## Development Approach

The back-end has been built with a focus on:

- **Modular Architecture**: The application is divided into modules like controllers, services, repositories, and utilities, which makes the system more maintainable and scalable.
- **Separation of Concerns**: Each module has a specific role to ensure that the business logic, data access, and web layers are well separated.
- **Basic CRUD Operations**: The API is primarily designed to handle basic CRUD functionality to support the front-end application.
- **Database Integration**: The application uses PostgreSQL with Spring Data JPA for efficient data management.
- **Error Handling**: Global exception handling ensures that any errors during API calls are captured and appropriately responded to.


