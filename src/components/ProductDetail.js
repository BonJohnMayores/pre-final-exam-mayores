import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ products, updateQuantity, addToCartItem }) {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="alert alert-warning">Product not found. <Link to="/">Go back</Link></div>
  );

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-5">
          <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="text-muted">Category: {product.category} • Rating: {product.rating}</p>
            <p>{product.description}</p>
            <p><strong>Specification:</strong> {product.specification}</p>
            <p><strong>Price:</strong> ₱{Number(product.price).toFixed(2)}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success" onClick={() => updateQuantity(product.id, 1)}>Increase</button>
              <button className="btn btn-outline-secondary" onClick={() => updateQuantity(product.id, -1)}>Decrease</button>
              <button className="btn btn-outline-primary" onClick={() => addToCartItem(product.id, 1)}>Add to Cart</button>
              <Link to="/" className="btn btn-link ms-auto">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
