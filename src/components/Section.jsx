import React from 'react';

function Section({ title, children, className = '', footer }) {
  return (
    <section className={`section ${className}`}>
      <h2>{title}</h2>
      <div className="card_wrap">{children}</div>
      {footer}
    </section>
  );
}

export default Section;
