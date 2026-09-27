import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
const [products, setProducts] = useState(() => {
  const savedProducts = localStorage.getItem("shopsphereProducts");

  if (savedProducts) {
    return JSON.parse(savedProducts);
  }

  return [
    {
      name: "Running Shoes",
      description: "Comfortable sports shoes",
      price: "₹1,999",
      originalPrice: "₹2,499",
      image: "/images/shoes.jpg",
      category: "Shoes",
      rating: 4.5,
      stock: 12
    },
    {
      name: "Wireless Headphones",
      description: "High quality sound",
      price: "₹2,499",
      originalPrice: "₹2,999",
      image: "/images/headphones.jpg",
      category: "Electronics",
      rating: 4.3,
      stock: 8
    },
    {
      name: "Smart Watch",
      description: "Smart features for your life",
      price: "₹3,999",
      originalPrice: "₹4,999",
      image: "/images/watch.jpg",
      category: "Electronics",
      rating: 4.6,
      stock: 5
    },
    {
      name: "Travel Backpack",
      description: "Perfect for travel and college",
      price: "₹1,499",
      originalPrice: "₹1,999",
      image: "/images/backpack.jpg",
      category: "Bags",
      rating: 4.4,
      stock: 15
    }
  ];
});
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem(
      "shopsphere-wishlist"
    );

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem(
      "shopsphere-orders"
    );

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
  localStorage.setItem(
    "shopsphereProducts",
    JSON.stringify(products)
  );
}, [products]);

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const cartRef = useRef(null);
  const productsRef = useRef(null);
  const homeRef = useRef(null);
  const ordersRef = useRef(null);

  const orderStatuses = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered"
  ];

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      const priceA = Number(
        a.price.replace("₹", "").replace(",", "")
      );

      const priceB = Number(
        b.price.replace("₹", "").replace(",", "")
      );

      if (sortOrder === "low-high") {
        return priceA - priceB;
      }

      if (sortOrder === "high-low") {
        return priceB - priceA;
      }

      return 0;
    }
  );

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const existingProduct = cart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.name === product.name
          ? {
              ...item,
              stock: item.stock - 1
            }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    const alreadyLiked = wishlist.some(
      (item) => item.name === product.name
    );

    if (alreadyLiked) {
      setWishlist(
        wishlist.filter(
          (item) => item.name !== product.name
        )
      );
    } else {
      setWishlist([
        ...wishlist,
        product
      ]);
    }
  };

  const increaseQuantity = (name) => {
    const cartItem = cart.find(
      (item) => item.name === name
    );

    if (!cartItem) {
      return;
    }

    const product = products.find(
      (item) => item.name === name
    );

    if (!product || product.stock <= 0) {
      alert("No more stock available.");
      return;
    }

    setCart(
      cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.name === name
          ? {
              ...item,
              stock: item.stock - 1
            }
          : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    const cartItem = cart.find(
      (item) => item.name === name
    );

    if (!cartItem) {
      return;
    }

    setCart(
      cart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.name === name
          ? {
              ...item,
              stock: item.stock + 1
            }
          : item
      )
    );
  };

  const removeFromCart = (name) => {
    const cartItem = cart.find(
      (item) => item.name === name
    );

    if (!cartItem) {
      return;
    }

    setCart(
      cart.filter(
        (item) => item.name !== name
      )
    );

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.name === name
          ? {
              ...item,
              stock: item.stock + cartItem.quantity
            }
          : item
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders(
      orders.filter(
        (order) => order.orderId !== orderId
      )
    );
  };

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    setOrders(
      orders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: newStatus
            }
          : order
      )
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      customerName.trim() === "" ||
      customerEmail.trim() === "" ||
      customerAddress.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOrderId =
      "SS-" +
      Date.now().toString().slice(-8);

    const newOrder = {
      orderId: newOrderId,
      customerName: customerName,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      paymentMethod: paymentMethod,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
      status: "Placed"
    };

    setOrders([
      ...orders,
      newOrder
    ]);

    setOrderId(newOrderId);
    setOrderPlaced(true);

    setCart([]);

    setCustomerName("");
    setCustomerEmail("");
    setCustomerAddress("");
    setPaymentMethod(
      "Cash on Delivery"
    );

    setShowCheckout(false);
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const wishlistCount =
    wishlist.length;

  const totalPrice = cart.reduce(
    (total, item) => {
      const price = Number(
        item.price
          .replace("₹", "")
          .replace(",", "")
      );

      return (
        total +
        price * item.quantity
      );
    },
    0
  );

  return (
    <div>

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() =>
          cartRef.current?.scrollIntoView({
            behavior: "smooth"
          })
        }
        onProductsClick={() =>
          productsRef.current?.scrollIntoView({
            behavior: "smooth"
          })
        }
        onHomeClick={() =>
          homeRef.current?.scrollIntoView({
            behavior: "smooth"
          })
        }
        onOrdersClick={() =>
          ordersRef.current?.scrollIntoView({
            behavior: "smooth"
          })
        }
      />

      {/* Hero Section */}

      <section
        className="hero"
        ref={homeRef}
      >

        <div className="hero-content">

          <h1>
            Shop Smart. Live Better.
          </h1>

          <p>
            Discover amazing products at great
            prices. Everything you need, all in
            one place.
          </p>

          <button
            className="shop-btn"
            onClick={() =>
              productsRef.current?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Shop Now
          </button>

        </div>

        <div className="hero-image">
          🛍️
        </div>

      </section>

      {/* Products Section */}

      <section
        className="products-section"
        ref={productsRef}
      >

        <h2>
          Featured Products
        </h2>

        <p className="product-result-count">
          {searchTerm
            ? `${sortedProducts.length} product${
                sortedProducts.length !== 1
                  ? "s"
                  : ""
              } found`
            : `${sortedProducts.length} products available`}
        </p>

        <div className="category-buttons">

          <button
            className={
              category === "All"
                ? "active-category"
                : ""
            }
            onClick={() =>
              setCategory("All")
            }
          >
            All
          </button>

          <button
            className={
              category === "Shoes"
                ? "active-category"
                : ""
            }
            onClick={() =>
              setCategory("Shoes")
            }
          >
            Shoes
          </button>

          <button
            className={
              category === "Electronics"
                ? "active-category"
                : ""
            }
            onClick={() =>
              setCategory("Electronics")
            }
          >
            Electronics
          </button>

          <button
            className={
              category === "Bags"
                ? "active-category"
                : ""
            }
            onClick={() =>
              setCategory("Bags")
            }
          >
            Bags
          </button>

        </div>

        <div className="sort-section">

          <label htmlFor="sort">
            Sort by:
          </label>

          <select
            id="sort"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
          >

            <option value="default">
              Default
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

          </select>

        </div>

        <div className="products-container">

          {sortedProducts.length > 0 ? (

            sortedProducts.map(
              (product, index) => (

                <ProductCard
                  key={index}
                  name={product.name}
                  description={
                    product.description
                  }
                  price={product.price}
                  originalPrice={
                    product.originalPrice
                  }
                  image={product.image}
                  category={product.category}
                  rating={product.rating}
                  stock={product.stock}

                  onAddToCart={() =>
                    addToCart(product)
                  }

                  onBuyNow={() => {

                    if (product.stock <= 0) {
                      alert(
                        "This product is out of stock."
                      );
                      return;
                    }

                    addToCart(product);

                    setTimeout(() => {

                      cartRef.current?.scrollIntoView({
                        behavior: "smooth"
                      });

                      setShowCheckout(true);

                    }, 100);

                  }}

                  onViewDetails={() =>
                    setSelectedProduct(
                      product
                    )
                  }

                  onToggleWishlist={() =>
                    toggleWishlist(
                      product
                    )
                  }

                  isWishlisted={wishlist.some(
                    (item) =>
                      item.name ===
                      product.name
                  )}

                />

              )
            )

          ) : (

            <div className="no-products">

              <h3>
                No products found
              </h3>

              <p>
                Try searching for another
                product.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* Wishlist Section */}

      <section className="wishlist-section">

        <h2>
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (

          <p>
            Your wishlist is empty.
          </p>

        ) : (

          <div className="wishlist-items">

            {wishlist.map(
              (item, index) => (

                <div
                  className="wishlist-item"
                  key={index}
                >

                  <div className="wishlist-product-info">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                    </div>

                  </div>

                  <strong>
                    {item.price}
                  </strong>

                  <button
                    className="remove-wishlist-btn"
                    onClick={() =>
                      toggleWishlist(item)
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* Cart Section */}

      <section
        className="cart-section"
        ref={cartRef}
      >

        <h2>
          Your Cart
        </h2>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>
              Your Cart is Empty
            </h3>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <button
              onClick={() =>
                productsRef.current?.scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {cart.map(
                (item, index) => (

                  <div
                    className="cart-item"
                    key={index}
                  >

                    <span>
                      {item.name}
                    </span>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.name
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.name
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <span>
                      ₹
                      {(
                        Number(
                          item.price
                            .replace(
                              "₹",
                              ""
                            )
                            .replace(
                              ",",
                              ""
                            )
                        ) *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(
                          item.name
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

            <div className="cart-total">

              <h3>
                Total: ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <button
                onClick={() =>
                  setShowCheckout(true)
                }
              >
                Proceed to Checkout
              </button>

            </div>

          </>

        )}

      </section>

      {/* Checkout Section */}

      {showCheckout && (

        <section className="checkout-section">

          <div className="checkout-container">

            <button
              className="close-checkout"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ×
            </button>

            <h2>
              Checkout
            </h2>

            <p>
              Complete your details to place
              the order.
            </p>

            <form
              onSubmit={handlePlaceOrder}
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={customerEmail}
                  onChange={(e) =>
                    setCustomerEmail(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  placeholder="Enter your delivery address"
                  rows="4"
                  value={customerAddress}
                  onChange={(e) =>
                    setCustomerAddress(
                      e.target.value
                    )
                  }
                ></textarea>

              </div>

              <div className="form-group">

                <label>
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                >

                  <option>
                    Cash on Delivery
                  </option>

                  <option>
                    UPI
                  </option>

                  <option>
                    Credit / Debit Card
                  </option>

                </select>

              </div>

              <div className="checkout-summary">

                <h3>
                  Total: ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </h3>

              </div>

              <button
                type="submit"
                className="place-order-btn"
              >
                Place Order
              </button>

            </form>

          </div>

        </section>

      )}

      {/* Order Confirmation */}

      {orderPlaced && (

        <section className="order-confirmation">

          <div className="confirmation-card">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Placed Successfully!
            </h2>

            <p>
              Thank you for shopping with
              ShopSphere. Your order has been
              received.
            </p>

            <p className="order-id">

              Order ID:
              <strong>
                {orderId}
              </strong>

            </p>

            <button
              onClick={() =>
                setOrderPlaced(false)
              }
            >
              Continue Shopping
            </button>

          </div>

        </section>

      )}

      {/* My Orders Section */}

      <section
        className="orders-section"
        ref={ordersRef}
      >

        <h2>
          My Orders
        </h2>

        {orders.length === 0 ? (

          <p>
            You have not placed any orders yet.
          </p>

        ) : (

          <div className="orders-container">

            {orders.map(
              (order, index) => {

                const currentIndex =
                  orderStatuses.indexOf(
                    order.status
                  );

                return (

                  <div
                    className="order-card"
                    key={index}
                  >

                    <div className="order-header">

                      <div>

                        <h3>
                          Order ID:
                          {order.orderId}
                        </h3>

                        <p>
                          {order.date}
                        </p>

                      </div>

                      <strong>
                        ₹
                        {order.total.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        className="delete-order-btn"
                        onClick={() =>
                          deleteOrder(
                            order.orderId
                          )
                        }
                      >
                        Delete Order
                      </button>

                    </div>

                    <div className="order-details">

                      <p>
                        <strong>
                          Customer:
                        </strong>{" "}
                        {order.customerName}
                      </p>

                      <p>
                        <strong>
                          Payment:
                        </strong>{" "}
                        {order.paymentMethod}
                      </p>

                      <div className="order-status">

                        <strong>
                          Status:
                        </strong>

                        <span className="status-badge">
                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.orderId,
                              e.target.value
                            )
                          }
                        >

                          <option value="Placed">
                            Placed
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                        </select>

                      </div>

                      <p>
                        <strong>
                          Items:
                        </strong>{" "}
                        {order.items.length}
                      </p>

                      <div className="order-progress">

                        {orderStatuses.map(
                          (
                            status,
                            statusIndex
                          ) => {

                            const isActive =
                              statusIndex <=
                              currentIndex;

                            return (

                              <div
                                key={status}
                                className="progress-wrapper"
                              >

                                <div
                                  className={`progress-step ${
                                    isActive
                                      ? "active"
                                      : ""
                                  }`}
                                >

                                  <span>
                                    {statusIndex +
                                      1}
                                  </span>

                                  <p>
                                    {status}
                                  </p>

                                </div>

                                {statusIndex <
                                  orderStatuses.length -
                                    1 && (

                                  <div
                                    className={`progress-line ${
                                      statusIndex <
                                      currentIndex
                                        ? "active-line"
                                        : ""
                                    }`}
                                  ></div>

                                )}

                              </div>

                            );
                          }
                        )}

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </section>

      {/* Product Details Modal */}

      {selectedProduct && (

        <div className="modal-overlay">

          <div className="product-modal">

            <button
              className="close-modal"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <div className="modal-image">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

            </div>

            <div className="modal-content">

              <h2>
                {selectedProduct.name}
              </h2>

              <div className="modal-rating">
                ⭐{" "}
                {selectedProduct.rating}
              </div>

              <p>
                {selectedProduct.description}
              </p>

              <div className="modal-price">

                <strong>
                  {selectedProduct.price}
                </strong>

                <span>
                  {selectedProduct.originalPrice}
                </span>

              </div>

              <button
                className="modal-cart-btn"
                disabled={
                  selectedProduct.stock <= 0
                }
                onClick={() => {

                  addToCart(
                    selectedProduct
                  );

                  setSelectedProduct(
                    null
                  );

                }}
              >
                {selectedProduct.stock <= 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Footer */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-about">

            <h2>
              ShopSphere
            </h2>

            <p>
              Shop smart, discover better
              products, and enjoy a simple
              shopping experience.
            </p>

          </div>

          <div className="footer-links">

            <h3>
              Quick Links
            </h3>

            <a href="#">
              Home
            </a>

            <a href="#">
              Products
            </a>

            <a href="#">
              Categories
            </a>

            <a href="#">
              About
            </a>

          </div>

          <div className="footer-links">

            <h3>
              Customer Support
            </h3>

            <a href="#">
              Help Center
            </a>

            <a href="#">
              Shipping
            </a>

            <a href="#">
              Returns
            </a>

            <a href="#">
              Contact Us
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 ShopSphere.
            All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default App;