📦 Edgistify_Ass

Edgistify_Ass is a robust e-commerce backend built with Node.js, Express, and MongoDB. It provides essential functionalities for user authentication, product management, cart handling, and order processing.

🚀 Features

User authentication with secure password hashing (Signup & Login)

Product management (Add & Retrieve Products)

Cart management (Add to Cart & Retrieve Cart)

Order processing (Create & Retrieve Orders)

Authentication middleware for secured routes

📌 API Documentation

🔹 User Routes

1️⃣ POST /user/signup

Description: Registers a new user.Request Body:

{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}

Responses:

✅ 200 OK - Successfully registered

❌ 400 Bad Request - Invalid input

2️⃣ POST /user/login

Description: Logs in an existing user.Request Body:

{
  "email": "string",
  "password": "string"
}

Responses:

✅ 200 OK - Successfully logged in (returns JWT token)

❌ 401 Unauthorized - Invalid credentials

🔹 Product Routes

1️⃣ POST /addProduct

Description: Adds a new product.Request Body:

{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "inStock": "number",
  "imageUrl": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}

Responses:

✅ 201 Created - Product added successfully

❌ 400 Bad Request - Invalid input

2️⃣ GET /getAllProducts

Description: Retrieves all products.Responses:

✅ 200 OK - Returns an array of products

❌ 500 Internal Server Error - Error retrieving products

🔹 Cart Routes

1️⃣ POST /addToCart

Description: Adds or updates a product in the cart.Request Body:

{
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": "number"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}

Responses:

✅ 200 OK - Successfully added/updated

❌ 400 Bad Request - Invalid input

2️⃣ GET /getCart

Description: Retrieves the current user's cart.Responses:

✅ 200 OK - Returns cart details

❌ 404 Not Found - No cart found

🔹 Order Routes

1️⃣ POST /createOrder

Middleware: authenticateUser (Ensures user is authenticated)Description: Places an order for the cart's products.Request Body:

{
  "userId": "ObjectId",
  "products": [
    {
      "productId": "ObjectId",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalPrice": "number",
  "shippingAddress": "string",
  "paymentStatus": "string",
  "orderStatus": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Responses:

✅ 200 OK - Order placed successfully

❌ 400 Bad Request - Invalid input

❌ 401 Unauthorized - User not authenticated

2️⃣ GET /getOrders

Middleware: authenticateUser (Ensures user is authenticated)Description: Retrieves user orders.Responses:

✅ 200 OK - Returns user orders

❌ 404 Not Found - No orders found

🔐 Authentication Middleware

The authenticateUser middleware ensures secure access by verifying JWT tokens before allowing users to create or view orders.

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Security: Bcrypt for password hashing, JWT for authentication

Validation: Validator.js for input validation

📜 Setup & Installation

Clone the repository

git clone https://github.com/your-repo/edgistify_ass.git
cd edgistify_ass

Install dependencies

npm install

Set up environment variables (.env file)

MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key

Start the server

npm start

✨ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

📧 Contact

For queries, contact your-email@example.com

💡 Happy Coding! 🚀

