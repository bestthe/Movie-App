import React from 'react';
import { ArrowDown } from 'react-bootstrap-icons';

function LoadMoreButton({ onClick, isVisible }) {
  if (!isVisible) return null;

  return (
    <button className="load_more" onClick={onClick}>
      <ArrowDown />
    </button>
  );
}

export default LoadMoreButton;
