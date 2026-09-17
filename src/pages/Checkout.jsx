import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontent";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cartItems, total: cartTotal }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place order");
      }

      setEmailSent(data.emailSent);
      setSubmitted(true);
      clearCart();
    } catch (submitError) {
      setError(submitError instanceof TypeError
        ? "The order service is unavailable. Start the backend and try again."
        : (submitError.message || "Unable to place order. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">Order placed! 🎉</h1>
        <p className="text-gray-600">
          Thanks, {form.name} — your order is approved. {emailSent
            ? `Your receipt has been emailed to ${form.email}.`
            : "Your receipt email is pending. Please check your email shortly."}
        </p>
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
          disabled={isSubmitting}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          {isSubmitting ? "Sending confirmation..." : "Place Order"}
        </button>
        {error && <p className="text-red-600" role="alert">{error}</p>}
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