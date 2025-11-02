import React, { useState, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetail';
import CartPage from './pages/CartPage';
import defaultProducts from './data/defaultProducts';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [cart, setCart] = useState([]); // {id, name, price, qty, image}

  function addProduct(product) {
    const parsed = { ...product, price: Number(product.price), quantity: Number(product.quantity) };
    setProducts(prev => [parsed, ...prev]);
  }

  function updateQuantity(id, delta) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p));
  }

  // Cart functions
  function addToCartItem(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // if not enough stock, don't add
    if (product.quantity < qty) {
      alert('Not enough stock available.');
      return;
    }
    // decrease stock in products
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: p.quantity - qty } : p));

    setCart(prev => {
      const existing = prev.find(i => i.id === productId);
      if (existing) {
        return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i);
      }
      return [{ id: product.id, name: product.name, price: Number(product.price), qty, image: product.image }, ...prev];
    });
  }

  function updateCartQty(productId, newQty) {
    // compute difference and adjust inventory accordingly
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const diff = newQty - item.qty;
    // if increasing, check stock
    const prod = products.find(p => p.id === productId);
    if (diff > 0 && prod && prod.quantity < diff) {
      alert('Not enough stock available to increase quantity.');
      return;
    }
    // adjust product stock
    if (diff !== 0) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: p.quantity - diff } : p));
    }
    setCart(prev => prev.map(i => i.id === productId ? { ...i, qty: Math.max(0, newQty) } : i).filter(i => i.qty > 0));
  }

  function removeCartItem(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + item.qty } : p));
    }
    setCart(prev => prev.filter(i => i.id !== productId));
  }

  function clearCart() {
    // return stock to inventory
    cart.forEach(item => {
      setProducts(prev => prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + item.qty } : p));
    });
    setCart([]);
  }

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  const total = useMemo(() => products.reduce((sum, p) => sum + (p.price * p.quantity), 0), [products]);
  const cartTotal = useMemo(() => cart.reduce((s,i)=>s + i.price * i.qty, 0), [cart]);

  return (
    <div className="container my-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management App</h2>
        <div className="d-flex align-items-center gap-2">
          <Link className="btn btn-outline-primary" to="/">🏠Home</Link>
          <Link className="btn btn-outline-success position-relative" to="/cart">🛒Cart
            {cartCount>0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{cartCount}</span>}
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage products={products} addProduct={addProduct} updateQuantity={updateQuantity} addToCartItem={addToCartItem} total={total} setProducts={setProducts} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} updateQuantity={updateQuantity} addToCartItem={addToCartItem} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateCartQty={updateCartQty} removeCartItem={removeCartItem} clearCart={clearCart} cartTotal={cartTotal} />} />
      </Routes>

      <footer className="mt-5 text-muted">
        Total Inventory Value: <strong>₱{total.toFixed(2)}</strong>
      </footer>
    </div>
  );
}

export default App;
