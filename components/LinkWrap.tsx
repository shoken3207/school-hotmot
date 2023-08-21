import React, { ReactNode } from 'react';
import Link from 'next/link';

const LinkWrap = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'black' }}>
      {children}
    </Link>
  );
};

export default LinkWrap;
