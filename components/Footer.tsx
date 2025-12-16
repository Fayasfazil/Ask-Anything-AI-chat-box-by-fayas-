import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full text-center p-4 mt-8 md:mt-12">
      <p className="text-xs text-dusk-300/60 tracking-wider">
        Copyright © {currentYear} by FAYAS AHAMED
      </p>
    </footer>
  );
};

export default Footer;