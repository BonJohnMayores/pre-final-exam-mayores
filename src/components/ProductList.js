import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, filter, updateQuantity, setProducts, addToCartItem }) {
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div>
      <div className="row g-3">
        {filtered.map(product => (
          <div className="col-md-6" key={product.id}>
            <ProductCard product={product} updateQuantity={updateQuantity} setProducts={setProducts} addToCartItem={addToCartItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
