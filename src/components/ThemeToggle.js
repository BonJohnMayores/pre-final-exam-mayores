import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      // ✅ For Bootstrap 5.3+ users (built-in dark mode)
      document.body.setAttribute("data-bs-theme", dark ? "dark" : "light");

      // ✅ For fallback (custom CSS support)
      if (dark) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      // Save user preference
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }, [dark]);

  return (
    <button
      className={`btn ${dark ? "btn-light" : "btn-dark"} ms-2`}
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
