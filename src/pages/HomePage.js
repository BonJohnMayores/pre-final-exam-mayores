import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import FilterBar from '../components/FilterBar';

export default function HomePage({ products, addProduct, updateQuantity, addToCartItem, total, setProducts }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="row">
      <div className="col-lg-8">
        <FilterBar categories={categories} filter={filter} setFilter={setFilter} />
        <ProductList products={products} filter={filter} updateQuantity={updateQuantity} setProducts={setProducts} addToCartItem={addToCartItem} />
      </div>

      <div className="col-lg-4">
        <div className="card mb-3">
          <div className="card-body">
            <h5>Add New Product</h5>
            <AddProductForm addProduct={addProduct} />
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h6>Total:</h6>
            <p>Overall Total Value: <strong>₱{total.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
