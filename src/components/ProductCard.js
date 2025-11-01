import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, updateQuantity, setProducts, addToCartItem }) {
  const subtotal = (Number(product.price) * Number(product.quantity));
  const lowStock = Number(product.quantity) < 5;

  function addToCart() {
    if (product.quantity > 0) addToCartItem(product.id, 1);
    else alert('Out of stock');
  }

  function removeProduct() {
    if (!window.confirm('Remove product?')) return;
    setProducts(prev => prev.filter(p => p.id !== product.id));
  }

  return (
    <div className={`card h-100 ${lowStock ? 'card-low-stock' : ''}`}>
      <img src={product.image} className="card-img-top feature-img" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="mb-1"><small className="text-muted">{product.category} • Rating: {product.rating}</small></p>
        <p className="card-text text-truncate">{product.description}</p>

        <div className="mt-auto">
          <p className="mb-1">Price: ₱{Number(product.price).toFixed(2)}</p>
          <p className="mb-1">Quantity: {product.quantity} {lowStock && <span className="badge bg-danger ms-2">Low Stock</span>}</p>
          <p className="mb-2">Subtotal: ₱{subtotal.toFixed(2)}</p>

          <div className="d-flex gap-2">
            <div className="flex justify-center mt-2">
              <button className="btn btn-sm btn-success" onClick={() => updateQuantity(product.id, 1)}>
                + Qty
              </button>
            </div>

            <div className="flex justify-center mt-2">
              <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(product.id, -1)}>
                - Qty
              </button>
            </div>

            <div className="flex justify-center mt-2">
              <button className="btn btn-sm btn-primary" onClick={addToCart}>
                Add to Cart
              </button>
            </div>

            <div className="flex justify-center mt-2">
              <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
                Details
              </Link>
            </div>

            <div className="text-center mt-2">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={removeProduct}
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
