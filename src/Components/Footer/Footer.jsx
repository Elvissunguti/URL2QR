import React from "react";
import { FaGithub } from "react-icons/fa";


const Footer = ({ darkMode }) => {


    return (
        <footer className={`bg-${darkMode ? 'gray-800' : 'green-500'} py-4 absolute w-full -bottom-11 ${darkMode ? 'text-white' : 'text-black'}`}>
            <div className="container mx-auto text-center">
                <p>© {new Date().getFullYear()} URL2QR. All rights reserved. <a href="https://github.com/Elvissunguti/URL2QR.git" target="_blank" rel="noopener noreferrer"><FaGithub className="inline-block ml-1" /></a></p>
            </div>
        </footer>
    );
}

export default Footer;
