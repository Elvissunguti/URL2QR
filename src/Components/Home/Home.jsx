import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";

const Home = () => {

    const [darkMode, setDarkMode] = useState(() => {
        const storedMode = localStorage.getItem("darkMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });

    // Function to toggle between dark and light mode
    const toggleMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        // Store the new mode preference in local storage
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    

    // Effect to set the correct class on initial render
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <section>
            <div className={darkMode ? "dark" : ""}>
                <Navbar darkMode={darkMode} toggleMode={toggleMode}/>
                <MainPage darkMode={darkMode}/>
                <Footer darkMode={darkMode} />

            </div>
        </section>
    )
}
export default Home;