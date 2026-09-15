import { useCart } from "../context/cartcontent";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="w-16 border rounded-md px-2 py-1"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
          <div className="text-right mt-6">
             <div className="text-xl font-bold mb-3">Total: ${cartTotal.toFixed(2)}</div>
             <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block">
                 Checkout
             </Link>
</div>
        </div>
      ))}
      <div className="text-right mt-6 text-xl font-bold">
        Total: ${cartTotal.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;