function ProductCard({
  name,
  description,
  price,
  originalPrice,
  image,
  category,
  rating,
  stock,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onToggleWishlist,
  isWishlisted
}) {
  const currentPrice = Number(
    price.replace("₹", "").replace(",", "")
  );

  const oldPrice = Number(
    originalPrice.replace("₹", "").replace(",", "")
  );

  const discount = Math.round(
    ((oldPrice - currentPrice) / oldPrice) * 100
  );

  return (
    <div className="product-card">

      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <span className="category-badge">
        {category}
      </span>

      <span
          className={`stock-status ${
            stock === 0 ? "out-of-stock" : ""
          }`}
        >
          {stock > 0
            ? `✓ In Stock (${stock})`
            : "✕ Out of Stock"}
        </span>

      <h3>{name}</h3>

      <p>{description}</p>

      <div className="product-rating">
        ⭐ {rating}
      </div>

      <div className="price-section">
        <h4>{price}</h4>

        <span className="original-price">
          {originalPrice}
        </span>

        <span className="discount">
          {discount}% OFF
        </span>
      </div>

      <button
        className="wishlist-btn"
        onClick={onToggleWishlist}
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      <button
        onClick={onAddToCart}
        disabled={stock === 0}
      >
        {stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

      <button
        className="buy-now-btn"
        onClick={onBuyNow}
        disabled={stock === 0}
      >
        {stock === 0 ? "Out of Stock" : "Buy Now"}
      </button>

      <button
        className="details-btn"
        onClick={onViewDetails}
      >
        View Details
      </button>

    </div>
  );
}

export default ProductCard;