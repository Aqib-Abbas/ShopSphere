function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  wishlistCount,
  onCartClick,
  onProductsClick,
  onHomeClick,
  onOrdersClick
}) {
  return (
    <nav className="navbar">

      <div className="logo">
        ShopSphere
      </div>

      <div className="nav-links">
        <a href="#" onClick={onHomeClick}>
          Home
        </a>

        <a href="#" onClick={onProductsClick}>
          Products
        </a>

        <a href="#" onClick={onOrdersClick}>
          My Orders
        </a>

        <a href="#">Categories</a>

        <a href="#">About</a>
      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchTerm("")}
          >
            ×
          </button>
        )}

        <button className="search-icon-btn">
          🔍
        </button>

      </div>

      <div className="nav-actions">

        <button className="wishlist-nav-button">
           ♡

          <span className="wishlist-count">
            {wishlistCount}
          </span>
        </button>

        <button
          className="cart-button"
          onClick={onCartClick}
        >
          🛒

          <span className="cart-count">
            {cartCount}
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;