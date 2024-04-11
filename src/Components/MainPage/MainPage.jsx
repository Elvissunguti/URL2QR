import React, { useState } from "react";
import QRCode from "qrcode.react";

const MainPage = ({ darkMode }) => {
    const [url, setUrl] = useState("");

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const downloadQRCode = () => {
        if (!url) {
            alert("Please enter a URL to generate the QR code.");
            return;
        }

        const canvas = document.querySelector("canvas");
        const qrCodeDataURL = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = qrCodeDataURL;
        a.download = "qr-code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="container mx-auto text-center">
                <h1 className={`text-2xl my-4 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Convert any URL to QR code</h1>
                <div className={`flex flex-row items-center justify-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <input
                        type="url"
                        name="url"
                        onChange={handleUrlChange}
                        value={url}
                        placeholder="Enter URL here..."
                        className={`px-4 py-2 border border-${darkMode ? 'gray-700' : 'gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-${darkMode ? 'blue-500' : 'blue-200'} sm:w-48 lg:w-1/2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    <button
                        onClick={downloadQRCode}
                        className={`text-white bg-green-500 ml-2 px-4 py-2 rounded-r-md hover:bg-${darkMode ? 'green-800' : 'blue-600'} focus:outline-none focus:ring-2 focus:ring-${darkMode ? 'green-500' : 'blue-200'}`}
                    >
                        Download QR Code
                    </button>
                </div>
                <div>
                    {url && (
                        <div className={`border border-${darkMode ? 'gray-700' : 'gray-300'} p-4 inline-block mb-4`}>
                            <QRCode 
                                value={url} 
                                size={256} 
                                bgColor={darkMode ? "#1F2937" : "#FFFFFF"} 
                                fgColor={darkMode ? "#FFFFFF" : "#000000"} 
                                includeMargin={true} 
                            />
                        </div>
                    )}
                    {!url && <p className={`${darkMode ? "text-white" : ""} font-semibold`}>Please input a URL above to generate the QR code.</p>}
                </div>
            </div>
        </section>
    );
};

export default MainPage;
