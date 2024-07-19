import React from 'react'
import { useState, useEffect } from 'react';
import MenuPopout from './MenuPopout';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    useEffect(() => {
      const closeMenu = (e: MouseEvent) => {
        if (isMenuOpen && !(e.target as Element).closest('#mobile-menu')) {
          setIsMenuOpen(false);
        }
      };
  
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }, [isMenuOpen]);
  
    return (
      <>
        <nav className="bg-gray-800 text-white h-[60px] fixed w-full">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  <MenuIcon/>
                </button>
              </div>
              <div className="flex-shrink-0">
                {/* Placeholder for logo */}
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </nav>
        <div className='h-[60px]'/>
  
        <MenuPopout isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
    );
  };
  
  export default Navbar;