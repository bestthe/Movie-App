import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, House, Film, Tv } from 'react-bootstrap-icons';

function Header() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setKeyword('');
  };

  return (
    <header>
      <h1>
        <Link to="/">Movies</Link>
      </h1>
      <nav>
        <ul className="category">
          <li>
            <NavLink to="/" end>
              <House />홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/movie">
              {' '}
              <Film />
              영화
            </NavLink>
          </li>
          <li>
            <NavLink to="/tv">
              <Tv />
              TV
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="searchBtn" type="submit">
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
