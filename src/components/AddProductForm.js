import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AddProductForm({ addProduct }) {
  const [form, setForm] = useState({ image: '', name: '', category: '', description: '', specification: '', rating: '', price: '', quantity: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.image) e.image = 'Image URL is required';
    if (!form.name) e.name = 'Name is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.description) e.description = 'Description is required';
    if (!form.specification) e.specification = 'Specification is required';
    if (!form.rating || isNaN(Number(form.rating))) e.rating = 'Rating is required (number)';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Price is required (number)';
    if (!form.quantity || isNaN(Number(form.quantity))) e.quantity = 'Quantity is required (number)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const product = { ...form, id: uuidv4(), price: Number(form.price), quantity: Number(form.quantity), rating: Number(form.rating) };
    addProduct(product);

    setForm({ image: '', name: '', category: '', description: '', specification: '', rating: '', price: '', quantity: '' });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Image URL</label>
        <input className="form-control" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        {errors.image && <div className="text-danger small">{errors.image}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        {errors.name && <div className="text-danger small">{errors.name}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <input className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        {errors.category && <div className="text-danger small">{errors.category}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        {errors.description && <div className="text-danger small">{errors.description}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Specification</label>
        <input className="form-control" value={form.specification} onChange={e => setForm({ ...form, specification: e.target.value })} />
        {errors.specification && <div className="text-danger small">{errors.specification}</div>}
      </div>

      <div className="row">
        <div className="col-6 mb-2">
          <label className="form-label">Rating</label>
          <input className="form-control" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
          {errors.rating && <div className="text-danger small">{errors.rating}</div>}
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Price</label>
          <input className="form-control" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          {errors.price && <div className="text-danger small">{errors.price}</div>}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Quantity</label>
        <input className="form-control" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        {errors.quantity && <div className="text-danger small">{errors.quantity}</div>}
      </div>

      <button className="btn btn-primary w-100" type="submit">Add Product</button>
    </form>
  );
}
