import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/cartcontent";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) =>
        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto animate-pulse">
        <div className="w-full h-80 bg-gray-200 rounded-lg mb-4" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-red-600 mb-4">Couldn't load this product: {error}</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back to shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-80 object-contain rounded-lg mb-4 bg-white" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      <p className="mt-4 text-gray-700">{product.description}</p>
      <button
        onClick={handleAddToCart}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
      {added && (
        <Link to="/cart" className="ml-4 text-blue-600 hover:underline">
          View cart
        </Link>
      )}
    </div>
  );
}

export default ProductDetail;