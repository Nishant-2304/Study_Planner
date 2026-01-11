import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false); 

  useEffect(() => { 
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); 
  }, []); 

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">Study Planner</div>
      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <a href="#">Home</a>
        <a href="#">Tasks</a>
        <a href="#">Time Table</a>
        <a href="#">Subjects</a>
      </div>
    </nav>
  );
}
