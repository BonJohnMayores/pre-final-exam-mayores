import React, { useState } from 'react';

export default function CartPage({ cart, updateCartQty, removeCartItem, clearCart, cartTotal }) {
  const [checkout, setCheckout] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  function validate() {
    const e = {};
    if (!checkout.name) e.name = 'Name is required';
    if (!checkout.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(checkout.email)) e.email = 'Valid email is required';
    if (!checkout.address) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(`Order placed! Thank you, ${checkout.name}. Total: ₱${cartTotal.toFixed(2)}`);
    clearCart();
    setCheckout({ name: '', email: '', address: '' });
    setErrors({});
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        <h4>Your Cart</h4>
        {cart.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <div className="list-group">
            {cart.map(item => (
              <div key={item.id} className="list-group-item d-flex align-items-center">
                <img src={item.image} alt={item.name} style={{width:80,height:60,objectFit:'cover'}} className="me-3" />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small>Price: ₱{item.price.toFixed(2)}</small>
                    </div>
                    <div className="text-end">
                      <div>Subtotal: <strong>₱{(item.price*item.qty).toFixed(2)}</strong></div>
                      <div className="input-group input-group-sm mt-2">
                        <button className="btn btn-outline-secondary" onClick={() => updateCartQty(item.id, item.qty - 1)}>-</button>
                        <input className="form-control text-center" value={item.qty} readOnly style={{width:50}} />
                        <button className="btn btn-outline-secondary" onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                        <button className="btn btn-outline-danger ms-2" onClick={() => removeCartItem(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-lg-4">
        <div className="card mb-3">
          <div className="card-body">
            <h5>Order Summary</h5>
            <p>Items: {cart.length}</p>
            <p>Total: <strong>₱{cartTotal.toFixed(2)}</strong></p>
            <button className="btn btn-danger w-100" onClick={clearCart} disabled={cart.length===0}>Clear Cart</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5>Checkout</h5>
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={checkout.name} onChange={e=>setCheckout({...checkout,name:e.target.value})} />
                {errors.name && <div className="text-danger small">{errors.name}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Email</label>
                <input className="form-control" value={checkout.email} onChange={e=>setCheckout({...checkout,email:e.target.value})} />
                {errors.email && <div className="text-danger small">{errors.email}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows={3} value={checkout.address} onChange={e=>setCheckout({...checkout,address:e.target.value})} />
                {errors.address && <div className="text-danger small">{errors.address}</div>}
              </div>

              <button className="btn btn-primary w-100" type="submit" disabled={cart.length===0}>Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
