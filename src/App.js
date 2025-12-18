import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MainSlide from './components/MainSlide';
import Main from './page/Main';
import Movie from './page/Movie';
import Tv from './page/Tv';
import Search from './page/Search';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();

  const category =
    location.pathname === '/movie'
      ? 'movie'
      : location.pathname === '/tv'
      ? 'tv'
      : 'home';

  const hideMainSlide = location.pathname === '/search';

  return (
    <>
      <Header />

      {!hideMainSlide && <MainSlide category={category} />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
