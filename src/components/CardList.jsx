import React from 'react';
import { StarFill } from 'react-bootstrap-icons';

function CardList({ item }) {
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  return (
    <div className="card_list">
      {posterUrl ? (
        <img src={posterUrl} alt={item.title || item.name} loading="lazy" />
      ) : (
        <div className="poster-placeholder">
          <span>이미지를 준비중입니다</span>
        </div>
      )}
      <h3>{item.title || item.name}</h3>
      {item.overview && <p className="overview">{item.overview}</p>}
      {item.vote_average > 0 && (
        <p className="rated">
          <StarFill size={18} />
          {item.vote_average.toFixed(1)}
        </p>
      )}
    </div>
  );
}

export default CardList;
