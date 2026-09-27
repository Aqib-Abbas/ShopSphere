# 🛍️ ShopSphere — E-Commerce Web Application

ShopSphere is a responsive e-commerce web application built with **React.js and Vite**. It provides a simple online shopping experience with product browsing, search, category filtering, sorting, wishlist, cart management, stock tracking, checkout, and order management.

## 🚀 Features

- 🏠 Responsive home page
- 🔎 Product search
- 🏷️ Category-based product filtering
- ↕️ Price sorting — Low to High / High to Low
- 📦 Product stock management
- 🛒 Add to Cart
- ➕➖ Cart quantity controls
- 🗑️ Remove products from cart
- 💰 Automatic cart total calculation
- ❤️ Wishlist functionality
- 🔢 Cart and wishlist item counters
- 👀 Product Details modal
- ⚡ Buy Now functionality
- 💳 Checkout form
- 💵 Multiple payment method options
- ✅ Order confirmation
- 🧾 My Orders section
- 📊 Order status tracking
- 💾 LocalStorage data persistence
- 📱 Responsive design for different screen sizes

## 🛠️ Technologies Used

- **React.js**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Vite**
- **Git**
- **GitHub**
- **Browser LocalStorage**

## 📂 Project Structure

```text
ShopSphere/
│
├── public/
│   └── images/
│       ├── shoes.jpg
│       ├── headphones.jpg
│       ├── watch.jpg
│       └── backpack.jpg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aqib-Abbas/ShopSphere.git
```

### 2. Open the project

```bash
cd ShopSphere
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal.

## 🛒 How It Works

### Product Search

Users can search products by name, description, or category.

### Category Filtering

Products can be filtered using categories such as:

- Shoes
- Electronics
- Bags
- All Products

### Cart Management

Users can:

- Add products to the cart
- Increase or decrease quantity
- Remove products
- View the total price

The available product stock is updated when products are added or removed from the cart.

### Wishlist

Users can add products to their wishlist and remove them whenever required.

### Checkout

The checkout section collects:

- Customer name
- Email
- Delivery address
- Payment method

After placing an order, an order ID is generated and an order confirmation is displayed.

### Order Management

The **My Orders** section stores previous orders and displays:

- Order ID
- Order date
- Customer information
- Payment method
- Ordered items
- Total amount
- Order status

Order status can be tracked through:

```text
Placed → Processing → Shipped → Delivered
```

## 💾 LocalStorage

ShopSphere uses browser **LocalStorage** to preserve important application data.

The project currently stores:

- Cart data
- Wishlist data
- Product stock
- Order history

This allows the data to remain available even after refreshing the browser.

## 📱 Responsive Design

The application includes responsive CSS so that the interface adapts to different screen sizes, including desktop, tablet, and mobile layouts.

## 🧠 React Concepts Used

This project helped implement practical React concepts including:

- Functional Components
- `useState`
- `useEffect`
- `useRef`
- Props
- Event Handling
- Conditional Rendering
- List Rendering with `.map()`
- Array Methods
- State Management
- LocalStorage
- Component-based UI development

## 📌 Future Enhancements

The project can be extended with:

- User authentication
- Backend API
- Database integration
- Real payment gateway
- Admin dashboard
- Product management
- User profile
- Order cancellation
- Product reviews and ratings
- Real product API integration

## 👨‍💻 Author

**Syed Aqib Abbas Rizvi**

B.Tech — Computer Science & Engineering

GitHub:  
https://github.com/Aqib-Abbas

LinkedIn:  
https://www.linkedin.com/in/syed-aqib-abbas-rizvi-103a84296

## 📄 License

This project was created for learning, portfolio development, and demonstration purposes.