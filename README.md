# I Speed To Lead

---

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Go to the project directory:
   ```bash
   cd <project-dir>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set the environment variables (see [ENV](#env) topic):
   Create a `.env` file in the project root and configure it based on the provided `env.example` file.

   ```bash
   cp env.example .env
   ```

5. Start the application:
   ```bash
   npm run start
   ```

6. Once the application is running, it will be available at:
    - **Application API**: [http://localhost:3000](http://localhost:3000)
    - **Swagger API documentation**: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## ENV

In general, it is a bad practice to store sensitive data in the repository. However, for test purposes, I will share my
environment file here, containing the URL connection string to the MongoDB Atlas cluster I created according to the
specification.

```dotenv
# General
NODE_ENV=local

# JWT
JWT_SECRET=XRt5LVOiQ22x4UkupW5xXUYXxEkdDLAls4qgHPEKF/oJ4zLun7zuhq2m4fZ8OagZVdtQL6nuLbP2pEZVkTyRjQ==

# MongoDB
MONGO_URL=mongodb+srv://stanislavdvp:LiT4ALSIAQad5QwN@ispeedtolead.lsorzbn.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=ispeedtolead
```

---

## MongoDB Atlas

The MongoDB Atlas mock samples provided did not contain relations using `ObjectId`, but rather numbers. To simulate and
enable `lookup` (or `populate`) functionality, I wrote a script to establish such relationships.

I decided to use the `sample_analytics` database for this purpose and create a relation from the `customer` collection
to the `account` collection using the `accountsRef` field.

---

## Postman

A public Postman collection is available at the following link:  
[Postman - I Speed To Lead API](https://www.postman.com/navigation-participant-86042138/ispeedtolead/request/xq457yl/i-speed-to-lead-api?action=share&creator=0&ctx=documentation)

This collection includes **scripts that run after requests** for **login** and **registration** to handle the token
received in the response. These scripts automatically save the token to a **Postman collection variable**, which is then
used for subsequent requests.

This setup eliminates the need for manually copying the token to the `Authorization` header. Simply **register** or *
*login**, and the token will be saved and used automatically in future requests to protected routes.

---

## Auth

The application uses **JWT** for authorization. To make authorized requests to protected routes, you should:

1. Retrieve a Bearer token by calling the `login` or `register` routes.
2. Pass the token in the **Authorization** header of requests to protected routes.

Example:

```json
{
  "Authorization": "Bearer <token>"
}
```

Replace `<token>` with the actual JWT retrieved from the authentication endpoint.

---