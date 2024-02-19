# Book-Store-app with Event-Driven Architecture


# Project Description:
-   We aim to develop a Bookstore Management application. The application will comprise three roles: User, Store Manager, and Administrator. Additionally, session management has been implemented to achieve this goal."


## Tech Stack

- This section lists all major frameworks/libraries used to boot the project.


<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="redis" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="express" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="express" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/docker-library/docs/ad703934a62fabf54452755c8486698ff6fc5cc2/nats-streaming/logo.png" alt="redis" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="redis" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="redis" width="40" height="40"/>
<img src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4" alt="redis" width="40" height="40"/>
<img src="https://jwt.io/img/pic_logo.svg" alt="redis" width="40" height="40"/>

## Project Workflow on Authentication
     
               ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
          │               │       │               │       │               │
          │    Register   │──────▶│   Email       │──────▶│    Login      │
          │               │       │   Module      │       │               │
          └───────────────┘       └───────────────┘       └───────────────┘
                        │                 │                   │
                        │                 │                   │
                        │                 │                   │
                        ▼                 ▼                   ▼
          ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
          │               │       │               │       │               │
          │  RefreshToken │◀──────│     Access    │──────▶│    Logout     │
          │               │       │     Token     │       │               │
          └───────────────┘       └───────────────┘       └───────────────┘


## Mail Module

- The **email module** is responsible for sending an email notification after the user registration process, utilizing an **event-driven system**.
- This process is utilized to confirm successful user registration and activate their accounts.
- Utilizing an **event-driven architecture**, the module responds to an event signaling the completion of the user registration process.
- In response to this event, the **email module** sends a **verification or welcome email** using a specific template.
- Email delivery occurs without user interaction, ensuring a **seamless user experience**.
- The module communicates with an **SMTP server** or another email delivery service to send the email notification.
     
 
         

### Endpoints - Authentication

1. **Register Endpoint:**
   - **Endpoint:** `/api/auth/register`
   - **Description:** Allows a user to register for a new account.
   - **Method:** `POST`
   - **Request Body:** JSON containing user details (e.g., name, email, password).
    - **Response:** Returns a success message upon successful registration.

2. **Login Endpoint:**
   - **Endpoint:** `/api/auth/login`
   - **Description:** Allows a registered user to log in and obtain an access token.
   - **Method:** `POST`
   - **Request Body:** JSON containing user credentials (e.g., username/email and password).
   - **Response:** Returns an access token upon successful authentication with user object.

3. **Logout Endpoint:**
   - **Endpoint:** `/api/auth/logout`
   - **Description:** Logs out the currently authenticated user.
   - **Method:** `POST`
   - **Authorization:** Bearer Token (JWT)
   - **Response:** Success message indicating successful logout.

4. **Refresh Token Endpoint:**
   - **Endpoint:** `/api/auth/refresh-token`
   - **Description:** Generates a new access token using a refresh token.
   - **Method:** `POST`
   - **Request Body:** JSON containing the refresh token in cookies.
   - **Response:** Returns a new access token upon successful refresh.

###  Error Handling
  
 
**In the project, error handling was done over the Middleware concept with the library I wrote.**

**1: Request Validation Error:** When the condition in the request body is not met, the `RequestValidationError` class is used to generate an error. This error is then passed through the `errorHandler` middleware, where it is serialized and sent as a response to the client.

**2: NotFoundError and Similar Errors:** In this case, after the custom Error object is handled by the `errorHandler` middleware, it is serialized and returned to the client as a response in an appropriate format.

If you have any question, please do not hesitate to ask.


## Database Schema on Authentication
| Entity        | Fields                                                      | Relationships                                      |
|---------------|-------------------------------------------------------------|----------------------------------------------------|
| UserEntity    | id, type, name, publicId, surname, mail, login, password, I, userlog | One-to-Many with UserLogEntity, One-to-Many with SessionEntity |
| TokenEntity   | id, clientToken, clientRfToken, token, operation, status, keyValue, keyPublicValue, table, expired | One-to-Many with SessionEntity, One-to-Many with SessionEntity |
| SessionEntity | id, deviceName, deviceModel, status, user, token, tokenRf  | Many-to-One with UserEntity, Many-to-One with TokenEntity, Many-to-One with TokenEntity |
| UserLogEntity | id, deviceName, explanation, operation, table, tableKeyId, user | Many-to-One with UserEntity |


 ## Features with TypeORM

- **Custom Repositories:** Custom repositories were utilized for database operations.

- **Transactions:** Transactions were used to manage operations atomically.

- **Entity Listeners and Subscribers:** Entity listeners and subscribers were employed to define custom behaviors that will automatically execute during database operations.


## Response Models Using DTOs

- **DTOs for Response:** Data Transfer Objects (DTOs) were employed for defining response models.

  - Objects specified in DTOs: The objects defined in DTOs were returned as responses, providing a structured and tailored data format to clients.

## Project Workflow on Book Store Management
   
   
               +-----------------------+     +-----------------------+
         |                       |     |                       |
         |      Admin Role       |     |      User Role        |
         |                       |     |                       |
         +-----------------------+     +-----------------------+
               |          |                   |          |
               |          |                   |          |
                  v          |                   v          |
         +------------------+  |             +------------------+
         |                  |  |             |                  |
         |  Create Bookstore|  |             |  View Bookstores |
         |                  |  |             |                  |
         +------------------+  |             +------------------+
                  |          |                   |          |
                  |          |                   |          |
                  v          |                   v          |
         +------------------+  |             +------------------+
         |                  |  |             |                  |
         |    Add New Book  |  |             |  View Books in   |
         |                  |  |             |  Each Store      |
         +------------------+  |             +------------------+
                  |          |                   |          |
                  |          |                   |          |
                  v          |                   v          |
         +------------------+  |             +------------------+
         |                  |  |             |                  |
         |  Add or Remove   |  |             | View Store in   |
         |                  |  |             |  Each Books  |
         |                  |  |             |                  |
         +------------------+  |             +------------------+
                  |          |                   |          |
                  |          |                   |          |
                  v          |                   v          |
         +------------------+  |                   |          |
         |                  |  |                   |          |
         |  Manage Users &  |  |                   |          |
         |  Roles           |  |                   |          |
         |                  |  |                   |          |
         +------------------+  |                   |          |
                              |                   |
                              +-------------------+

## Endpoints -  Book Store Management

## Admin Operations

### Create New User
- **Method:** `POST`
- **Endpoint:** `/api/v1/bookManager/users`
- **Permissions:** Accessible by users who are logged in and have Admin privileges.
- **Data Format:** JSON
- **Body:** 
  ```json
  {
    "type": 1,
    "mail": "sirziysddsemlu@gufum.com",
    "name": "nuri",
    "surname": "sen",
    "phone": "+905360565521",
    "password": "564422"
  }


#### Add New Book
- **Method:** `POST`
- **Endpoint:** `/api/v1/bookManager/book`
- **Permissions:** Accessible by users who are logged in and have Admin privileges.
- **Data Format:** JSON
- **Body:** 
  ```json
  {
  "title": "fenerbahce",
    "author": "kemal",
    "publicationYear": 1920,
    "ISBN": "1232512lks1",
    "genre":  6
  }

#### Create New Bookstore
- **Method:** `POST`
- **Endpoint:** `/api/v1/bookManager/bookstore`
- **Permissions:** Accessible by users who are logged in and have Admin privileges.
- **Data Format:** JSON
- **Body:** 
  ```json
  {
     "name": "datasss kitabevi",
    "address": "izmir",
   "phoneNumber": "+905324663521"
  }
  

#### Add or Remove Stock
- **Method:** `POST`
- **Endpoint:** `/api/v1/bookManager/stock`
- **Permissions:** Accessible by users who are logged in and have Admin privileges.
- **Data Format:** JSON
- **Body:** 
  ```json
  {
    "storeId": 1,
    "bookId": 1,
    "quantity": 16,
    "isRemove": false
  }

## User Operations

#### View Bookstores

- **Method:** `GET`
- **Endpoint:** `/api/v1/bookManager/bookstore?limit=10&page=1`
- **Permissions:** Accessible by users who are logged in and have User privileges.
- **Data Format:** JSON
 

#### View Books in Each Store or View Store in Each Books
- **Method:** `GET`
- **Endpoint:** `/api/v1/bookManager/storeToBook?limit=10&page=1&storeToBook=false`
- **Permissions:** Accessible by users who are logged in and have User privileges.
- **Data Format:** JSON



## Database Schema on  Book Store Management

    BookEntity          BookToStoreEntity            StoreEntity
    +------------+     +------------------+          +------------+
    | book_id    |     | book_id          |          | store_id   |
    | title      |     | store_id         |          | name       |
    | author     |     | quantity         |          | address    |
    | ISBN       |     +------------------+          | phoneNumber|
    | genre      |            |                    |            |
    +------------+            |                    +------------+
                          


- ### Ways to run the application
    #1:) for local development without docker

    - ### Package installation
        - When we run our project with Docker in the production environment or locally, global packages will be installed automatically. Entering these commands is sufficient only for our team members who will run it for the first time locally without docker.
            - ``git clone or git pull``
            - ``npm install -g win-node-env``

            - ``npm  i -g tslib``

            - ``npm i``

    - ### Requirements

        - To start the system, implement the environment files and configuration files. Additionally, add the following values to the environment file.
        - For security reasons, we do not display the values inside the .env files. By downloading the application from this link https://www.gpg4win.org/ and entering the password for the encrypted .env file on your local machine, you can make it readable again.

    
    
    #2:) for local development with docker
    
    - ### Requirements
        - Docker and Docker Compose must be installed on your local machine.
        - After cloning the project, you can run the following command to start the project.
        
    - ``docker-compose up``
    
    ``


## Author

👤 **Nurettin Şen**

- Linkedin: [@nurettin-sen](https://www.linkedin.com/in/nurettin-sen/)
- Github: [@nuri35](https://github.com/nuri35)