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
