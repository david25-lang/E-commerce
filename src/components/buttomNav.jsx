import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Search, Heart, User } from "lucide-react";

function BottomNav() {
  const location = useLocation();

  const tabs = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/wishlist", icon: Heart, label: "Wishlist" },
    { to: "/account", icon: User, label: "Account" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t rounded-t-2xl flex justify-around items-center py-3 z-20">
      {tabs.map(({ to, icon: Icon, label }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center text-xs gap-1 ${
              active ? "text-black" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;