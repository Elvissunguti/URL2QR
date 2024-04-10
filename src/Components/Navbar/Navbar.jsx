import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import logo_black from "../Assets/Logo/url2qr-high-resolution-logo-black-transparent.png";
import logo_white from "../Assets/Logo/url2qr-high-resolution-logo-white-transparent.png";


const Navbar = ({ darkMode, toggleMode }) => {

    

    const logoSrc = darkMode ? logo_white : logo_black;


    return (
        <nav className={`bg-${darkMode ? 'gray-800' : 'green-500'} p-4 flex justify-between items-center`}>
            <div className="flex items-center">
                <a href="https://url2qr.vercel.app/">
                <img 
                    src={logoSrc}
                    alt="URL2QR Logo"
                    className="h-16 w-18  pl-4"
                />
                </a>
                <h1 className={`text-white text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>URL to QR Code Converter</h1>
            </div>
            <button
                onClick={toggleMode}
                className="bg-white dark:bg-gray-700 p-2 rounded-full text-gray-800 dark:text-gray-300 transition duration-300"
            >
                {darkMode ? <FaSun className="mr-1 text-yellow-400" style={{ fontSize: '1.2rem' }} /> : <FaMoon className="mr-1 text-gray-400" style={{ fontSize: '1.2rem' }} />}
            </button>
        </nav>
    );
};

export default Navbar;
