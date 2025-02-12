# 📦 Edgistify_Ass

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
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
Responses:

✅ 200 OK - Successfully registered

❌ 400 Bad Request - Invalid input

2️⃣ POST /user/login

Description: Logs in an existing user.Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Responses:

✅ 200 OK - Successfully logged in (returns JWT token)

❌ 401 Unauthorized - Invalid credentials

🔹 Product Routes

1️⃣ POST /addProduct

Description: Adds a new product.Request Body:

```json
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
```

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

```json
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
```
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

```json
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
```
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

```bash
git clone https://github.com/your-repo/edgistify_ass.git
cd edgistify_ass
```

Install dependencies

```bash
npm install
```

Set up environment variables (.env file)

```env
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key
```

Start the server

```bash
npm start
```

✨ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

📧 Contact

For queries, contact himanshu.masai@gmail.com

💡 Happy Coding! 🚀

# 📦 Edgistify_Ass Frontend

🚀 **Live Project:** [Edgistify_Ass Frontend](https://edgistify-ass-3.onrender.com/)

The frontend of Edgistify_Ass is built with React.js, offering an intuitive and seamless shopping experience for users.

## Tech Stack

**Client:**
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**Server:**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Pages

- **Home Page**
- 
  <img width="946" alt="image" src="https://github.com/user-attachments/assets/b56c51bd-2c60-4901-8306-44c946308cba" />

- **Signup Page**
- 
  <img width="554" alt="image" src="https://github.com/user-attachments/assets/b5aaf018-f97d-4c11-a62b-a0ae48e9016a" />

- **Login Page**
- 
  ![image](https://github.com/user-attachments/assets/899c8d32-9fac-43ec-8b55-09dcf98a0de1)

- **Product Listing Page**
  <img width="947" alt="image" src="https://github.com/user-attachments/assets/693c0c2f-ec5f-4289-8418-3d1404ad37fd" />

- **Cart Page**
- 
  ![image](https://github.com/user-attachments/assets/c284493b-a55b-44fc-ab12-10c9d95c013e)

- **Checkout Page**
- 
  <img width="548" alt="image" src="https://github.com/user-attachments/assets/78d89ccf-af2e-4b46-9211-4f40cc8b3ddd" />




💡 **Happy Shopping! 🚀**
