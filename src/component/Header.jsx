import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

function Header() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const [background, setBackground] = useState(false);

  useEffect(() => {
      const onScroll = () => {
          setBackground(window.scrollY > 0); // 0보다 크면 배경 ON
      };
  
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${background ? "background" : ""}`}>
      <NavLink to="/"><h1>Jiflix</h1></NavLink>

      {/* PC용 메뉴 */}
      <nav className="nav-pc">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movie">Movie</NavLink>
        <NavLink to="/tv">TV Shows</NavLink>
      </nav>

      {/* 햄버거 아이콘 */}
      <div className="burger" onClick={() => setMenuOpen(prev => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 모바일 메뉴 */}
      <nav className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/movie" onClick={() => setMenuOpen(false)}>Movie</NavLink>
        <NavLink to="/tv" onClick={() => setMenuOpen(false)}>TV Shows</NavLink>
      </nav>
    </header>
  )
}

export default Header