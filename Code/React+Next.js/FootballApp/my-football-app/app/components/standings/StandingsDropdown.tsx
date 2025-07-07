// components/StandingsDropdown.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function StandingsDropdown() {
  // Removed getLinkClasses from props
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Get pathname here as well for highlighting

  // Function to determine CSS classes for links (moved here)
  const getLinkClasses = (href: string) => {
    const baseClasses = "font-semibold transition-colors duration-200";
    // Check if the link is the root path and if the current path is exactly the root path
    if (href === "/" && pathname === "/") {
      return `${baseClasses} text-green-500 font-bold`;
    }
    // For other links, check if the current path starts with the link's href
    // This allows "/standings/details" to still highlight "/standings"
    if (href !== "/" && pathname.startsWith(href)) {
      return `${baseClasses} text-green-500 font-bold`;
    }
    // Return classes for non-active links
    return `${baseClasses} text-neutral-100 hover:text-green-500`;
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine if any item in the dropdown is currently active
  const isStandingsActive =
    pathname.startsWith("/nationalStandings") ||
    pathname.startsWith("/internationalStandings");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 ${isStandingsActive ? "text-green-500 font-bold" : "text-neutral-100 hover:text-green-500"} font-semibold transition-colors duration-200`}
      >
        Standings
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <Link
            href="/nationalStandings"
            className={`block px-4 py-2 text-sm ${getLinkClasses("/nationalStandings")}`}
            onClick={() => setIsOpen(false)}
          >
            National
          </Link>
          <Link
            href="/internationalStandings"
            className={`block px-4 py-2 text-sm ${getLinkClasses("/internationalStandings")}`}
            onClick={() => setIsOpen(false)}
          >
            UEFA
          </Link>
        </div>
      )}
    </div>
  );
}
