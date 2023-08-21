import React, { ReactNode, useState } from 'react';
import CommonSnackbar from '../components/CommonSnackbar';
import MobileMenu from '../components/MobileMenu';
import Topbar from '../components/Topbar';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <CommonSnackbar />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Topbar setIsOpen={setIsOpen} />
      {children}
    </div>
  );
};

export default Layout;
