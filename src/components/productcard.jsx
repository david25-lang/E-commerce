import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/wishlistcontext";

function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const saved = isWishlisted(product.id);

  return (
    <article className="group relative rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        className={`absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${saved ? "text-[#f05d5e]" : "text-slate-500"}`}
      >
        <Heart size={17} fill={saved ? "currentColor" : "none"} />
      </button>
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="mb-3 h-48 w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.02]" />
        <h3 className="font-semibold text-[#172554]">{product.name}</h3>
        <p className="text-sm text-slate-500">{product.category}</p>
        <p className="mt-2 font-bold text-[#172554]">${product.price.toFixed(2)}</p>
      </Link>
    </article>
  );
}

export default ProductCard;