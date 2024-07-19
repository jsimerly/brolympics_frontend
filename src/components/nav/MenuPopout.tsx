import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { logout } from '../../firebase/auth';
import CookieIcon from '@mui/icons-material/Cookie';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const MenuPopout: React.FC<MenuPopoutProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [activeEvents, setActiveEvents] = useState([])
    const [activeBrols, setActiveBrols] = useState([])
    const [formerBrols, setFormerBrols] = useState([])
    
    useEffect(() => {
        // get the information from the API to populate these
    },[])
    const { loggedIn, user } = useAuth();

    const handleLogoutClicked = () => (
        logout()
    )
  
    return (
      <div 
        className="fixed inset-x-0 top-[60px] z-50 bg-gray-800 bg-opacity-95 overflow-y-auto flex flex-col"
        style={{ height: 'calc(100vh - 60px)' }}
      >
        {/* Main menu content */}
        <div className="flex-grow px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={onClose}
            className="absolute text-white top-4 right-4 hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <label className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Active Events</label>
            <label className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Active Brolympics</label>
            <label className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Former Brolympics</label>
          </div>
        </div>
        
        {/* Fixed bottom bar */}
        <div className="bg-gray-900 h-[100px] flex items-center justify-between pl-4">
          <div className="flex items-center truncate">
            {loggedIn && user ? (
              <>
                <img 
                  src={user.photoURL || 'https://via.placeholder.com/40'} 
                  alt="User" 
                  className="w-10 h-10 mr-3 rounded-full"
                />
                <span className="font-medium text-white">{user.displayName || user.email}</span>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="flex pr-2 space-x-1">
            <button className="p-1 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                <div className='flex flex-col items-center'>
                    <CookieIcon/>
                    <span className='text-[12px]'>Policies</span>
                </div>
            </button>
            <button className="p-1 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                <div className='flex flex-col items-center'>
                    <SettingsIcon/>
                    <span className='text-[12px]'>Settings</span>
                </div>
            </button>
            <button 
                className="p-1 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                onClick={handleLogoutClicked}
            >
                <div className="flex flex-col items-center">
                    <LogoutIcon/>
                    <span className='text-[12px]'>Logout</span>
                </div>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MenuPopout;