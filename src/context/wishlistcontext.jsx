import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const storageKey = "davis-gee-wishlist";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  function toggleWishlist(product) {
    setWishlistItems((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, product],
    );
  }

  function isWishlisted(id) {
    return wishlistItems.some((item) => item.id === id);
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}