# Book-Store-app


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

```mermaid
flowchart LR
    subgraph UserEntity
    id1(UserEntity)
    id2(UserType)
    id3(name)
    id4(publicId)
    id5(surname)
    id6(mail)
    id7(login)
    id8(password)
    id9(I)
    id10(userlog)
    end
    subgraph TokenEntity
    id11(TokenEntity)
    id12(clientToken)
    id13(clientRfToken)
    id14(token)
    id15(operation)
    id16(status)
    id17(keyValue)
    id18(keyPublicValue)
    id19(table)
    id20(expired)
    end
    subgraph SessionEntity
    id21(SessionEntity)
    id22(deviceName)
    id23(deviceModel)
    id24(status)
    id25(user)
    id26(token)
    id27(tokenRf)
    end
    subgraph UserLogEntity
    id28(UserLogEntity)
    id29(deviceName)
    id30(explanation)
    id31(operation)
    id32(table)
    id33(tableKeyId)
    id34(user)
    end
    id1 --> id2
    id1 --> id3
    id1 --> id4
    id1 --> id5
    id1 --> id6
    id1 --> id7
    id1 --> id8
    id1 --> id9
    id1 --> id10
    id11 --> id12
    id11 --> id13
    id11 --> id14
    id11 --> id15
    id11 --> id16
    id11 --> id17
    id11 --> id18
    id11 --> id19
    id11 --> id20
    id21 --> id22
    id21 --> id23
    id21 --> id24
    id21 --> id25
    id21 --> id26
    id21 --> id27
    id28 --> id29
    id28 --> id30
    id28 --> id31
    id28 --> id32
    id28 --> id33
    id28 --> id34
