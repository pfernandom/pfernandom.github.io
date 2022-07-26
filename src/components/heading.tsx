import Link from 'next/link';
import React from 'react';

function Heading({ title, slug = '' }: { title: string; slug?: string }) {
  return (
    <div className="heading">
      <Link href={`/${slug}`} scroll={false}>
        <div style={{ display: 'flex' }} className="heading__link">
          <h1 className="small">Pedro Marquez-Soto: {title}</h1>
        </div>
      </Link>

      <Link href="/about" scroll={false}>
        <div className="heading__link">About Pedro</div>
      </Link>
    </div>
  );
}

Heading.defaultProps = {
  slug: '',
};

export default Heading;
