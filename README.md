
<img width="1435" height="705" alt="Screenshot 2026-01-09 002158" src="https://github.com/user-attachments/assets/5fba8720-64a8-424f-95fb-58df8a9a69c6" />

Core Technologies:
Java 25: Leverages the latest Long-Term Support (LTS) version of Java for modern language features and performance.
Spring Boot 4.0.1: The foundation of the application, providing simplified configuration and rapid development.
Spring Data JPA: Used for seamless object-relational mapping and database communication.
H2 Database: An in-memory database used for development and runtime efficiency without requiring a separate database installation.
Lombok: Reduces boilerplate code by automatically generating getters, setters, and constructors.

Documentation & API Testing:
SpringDoc OpenAPI (Swagger UI) 3.0.1: Automatically generates interactive API documentation. Once the application is running, you can explore and test the endpoints via the Swagger UI dashboard.

The REST API is accessible at the base URL: /api/todos. All data is exchanged in JSON format.

http://localhost:8080/swagger-ui/index.html#/

GET	      /api/todos	Fetch all to-do items from the database.	
POST	    /api/todos	Create a new to-do item.	
DELETE	  /api/todos/{id}	Delete a specific to-do item by its unique ID.	
DELETE	  /api/todos/all	Wipe all entries from the to-do list.	
