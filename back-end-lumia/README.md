# Lumia Backend Services

The **Lumia Backend** is the central nervous system of the Lumia AI platform. Built with **Spring Boot 3.3 (Java 21)**, it is a robust, scalable API designed to manage user sessions, handle AI script submissions, store game logs, and coordinate execution with the Cluster Manager.

## 🌟 Key Features

- **RESTful API & WebSockets**: Handles synchronous data operations via REST and real-time updates (like live game logs and status changes) using WebSockets (`@stomp/stompjs` compatible).
- **Secure Authentication**: Integrates OAuth2 client and JWT (JSON Web Tokens) for secure, stateless user authentication and authorization.
- **MongoDB Data Layer**: Utilizes Spring Data MongoDB for flexible, document-based storage of user profiles, game statistics, and AI model metadata.
- **Email Notifications**: Integrated with Resend (`com.resend:resend-java`) for transactional emails and alerts.
- **Cluster Manager Integration**: Communicates seamlessly with the Python FastAPI-based Cluster Manager to trigger Docker container creations, manage training queues, and retrieve trained model files.
- **API Documentation**: Auto-generated Swagger UI via `springdoc-openapi`.

## 🛠️ Tech Stack

- **Java**: Version 21
- **Framework**: Spring Boot 3.3.4
- **Database**: MongoDB
- **Security**: Spring Security, OAuth2, JJWT
- **API Docs**: SpringDoc OpenAPI
- **Code Quality**: SonarQube integrated via Maven plugin

## 🚀 Getting Started (Local Development)

If you wish to run the backend outside of the main Docker Compose setup for development purposes:

### Prerequisites
- JDK 21
- Maven
- A running MongoDB instance (you can use the `docker-compose.yml` in the project root to spin one up).

### Configuration
1. Ensure your MongoDB connection details are correctly set in your `application.yml` or `application.properties`.
2. Set any necessary environment variables, such as `UPLOAD_DIR` (e.g., `/uploads`), `JWT_SECRET`, and `SPRING_PROFILES_ACTIVE`.

### Running the Server
Navigate to the `demo` directory and run the application using Maven:
```bash
cd demo
mvn spring-boot:run
```

The server will typically start on port `8000` (as defined in the Docker configuration).

### API Documentation
Once the server is running, you can access the interactive OpenAPI documentation at:
```
http://localhost:8000/swagger-ui/index.html
```
*(Port may vary based on your local `application.properties` configuration)*

## 📂 Project Structure

- `src/main/java/com/test/demo`: Contains the application logic, controllers, models, and repositories.
- `src/test`: Contains unit and integration tests.
- `pom.xml`: Maven configuration and dependency management.
