# Bike Store Application

This is a simple application for managing a bike store. It includes functionalities for managing bike products and handling customer orders. The application uses **MongoDB**, **Express**, **Node.js**, and **TypeScript** to provide a complete solution for managing products and orders in the store.

## Features

- **Product Management:**

  - Create, read, update, and delete bike products.
  - Search for bikes by name, brand, or category.
  - Display details for individual bike products.

- **Order Management:**

  - Place orders for bikes.
  - Track orders based on customer email and product details.
  - Reduce stock and manage inventory when an order is placed.
  - Calculate total revenue from all orders.

- **Inventory Management:**

  - Automatically update stock levels after an order is placed.
  - Set a product’s status to "Out of Stock" when inventory reaches zero.

- **Revenue Calculation:**
  - Calculate the total revenue generated from all orders using MongoDB aggregation.

## Technologies Used

- **Node.js** – JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express** – Web application framework for Node.js.
- **MongoDB** – NoSQL database used to store products and orders.
- **Mongoose** – ODM (Object Document Mapper) for MongoDB.
- **TypeScript** – A superset of JavaScript that adds static types.
- **Dotenv** – A module for loading environment variables from a `.env` file.
- **CORS** – Middleware for enabling Cross-Origin Resource Sharing.

## Requirements

Before running the project locally, make sure you have the following installed:

- **Node.js** – Version 16.x or higher
- **MongoDB** – Local or cloud instance (e.g., MongoDB Atlas)
 

## Setting Up the Project Locally

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/bike-store.git
```

### 2. Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
cd bike-store
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project, and set the following environment variables:

```bash
PORT=5000
DATABASE_URL=mongodb://localhost:27017/bikestore
```

- **PORT:** – The port on which the server will run.
- **DATABASE_URL:** – Your MongoDB connection URL (can be a local MongoDB instance or a MongoDB Atlas connection string).

### 4. Run the Application
Start the development server by running the following command:

```bash
npm run dev
```
This will start the server on the port specified in your .env file (default: 5000).

### 5. Access the Application
Once the server is running, you can access the application API at:

```bash
http://localhost:5000
```

## 6. API Endpoints

### Product Management:

- **POST /api/products**: Create a new product.
- **GET /api/products**: Get a list of all bikes. Optionally, you can query by name, brand, or category (e.g., `/api/products?searchTerm=Mountain`).
- **GET /api/products/:productId**: Get details of a single bike.
- **PUT /api/products/:productId**: Update bike details.
- **DELETE /api/products/:productId**: Delete a bike.

### Order Management:

- **POST /api/orders**: Create an order (send email, product ID, and quantity).
- **GET /api/orders/revenue**: Calculate the total revenue generated from all orders.

## 7. Testing

You can test the endpoints using Postman or any HTTP client. Here are some example requests:

### Create Product:

- **URL**: `POST /api/products`
- **Body**:
```json
{
  "name": "Mountain Xtreme",
  "brand": "Giant",
  "price": 1500,
  "category": "Mountain",
  "description": "A high-performance mountain bike.",
  "quantity": 10,
  "inStock": true
}
```

### Create Order:

- **URL**: `POST /api/orders`
- **Body**:
```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",  // Replace with a valid product ID
  "quantity": 2
}
```

### Get Revenue:

- **URL**: `GET /api/orders/revenue`
- **Description**: This endpoint calculates the total revenue generated from all orders.
- **Response**:
```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 3600  // The total revenue from all orders
  }
}
```

## Development & Contribution

- Fork the repository to your own GitHub account.
- Clone your fork to your local machine.
- Create a new branch for your changes.
- Make your changes and commit them.
- Push your changes and create a pull request.

We welcome contributions and improvements! If you have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [MongoDB](https://www.mongodb.com/) for providing the database solution.
- Thank you to the developers of the libraries and tools used in this project:
  - [Express](https://expressjs.com/) - Web framework for Node.js
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
  - [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file
  - [CORS](https://www.npmjs.com/package/cors) - Middleware to enable Cross-Origin Resource Sharing
  - [Node.js](https://nodejs.org/en/) - JavaScript runtime




