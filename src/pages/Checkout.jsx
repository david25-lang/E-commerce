import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontent";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // No real payment yet — just simulate a successful order
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">Order placed! 🎉</h1>
        <p className="text-gray-600">Thanks, {form.name} — a confirmation would normally be emailed to {form.email}.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <div className="p-6">Your cart is empty — add something before checking out.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto grid md:grid-cols-2 gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Shipping Details</h1>
        <input name="name" value={form.name} onChange={handleChange} required
          placeholder="Full name" className="border rounded-md px-3 py-2" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required
          placeholder="Email" className="border rounded-md px-3 py-2" />
        <input name="address" value={form.address} onChange={handleChange} required
          placeholder="Address" className="border rounded-md px-3 py-2" />
        <div className="flex gap-4">
          <input name="city" value={form.city} onChange={handleChange} required
            placeholder="City" className="border rounded-md px-3 py-2 flex-1" />
          <input name="zip" value={form.zip} onChange={handleChange} required
            placeholder="ZIP code" className="border rounded-md px-3 py-2 w-28" />
        </div>
        <button type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Place Order
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-b">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4 text-lg">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;