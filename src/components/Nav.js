import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

export const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    }
  }, []);
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="MovieDB logo"
        src="https://cdn.designhouse.co.kr/cms/img/2019/06/M.1560146037.9003.9.jpg"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
      />
      <img
        alt="User logged"
        src="https://imagescdn.gettyimagesbank.com/500/201606/a10504864.jpg"
        className="nav__avatar"
      />
    </nav>
  );
}
