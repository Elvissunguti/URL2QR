import React, { useState } from "react";

const MainPage = ({ darkMode }) => {
    const [url, setUrl] = useState("");
    const [qrCodeImage, setQRCodeImage] = useState(null);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const generateQRCode = async () => {

        const fileFormat = 'png';
        const apiUrl = '/api/generateQRCode'; // Path to the serverless function

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, fileFormat })
        };

        try {
            const response = await fetch(apiUrl, config);
            if (!response.ok) {
                throw new Error('Failed to generate QR code');
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            console.log("Image URL:", imageUrl);
            setQRCodeImage(imageUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const downloadQRCode = () => {
        if (!qrCodeImage) {
            alert("No QR code image to download.");
            return;
        }
        const a = document.createElement("a");
        a.href = qrCodeImage;
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
                        onClick={generateQRCode}
                        className={`text-white bg-green-500 ml-2 px-4 py-2 rounded-r-md hover:bg-${darkMode ? 'green-800' : 'blue-600'} focus:outline-none focus:ring-2 focus:ring-${darkMode ? 'green-500' : 'blue-200'}`}
                    >
                        Convert
                    </button>
                </div>
                <div>
                    {qrCodeImage && (
                        <div className={`border border-${darkMode ? 'gray-700' : 'gray-300'} p-4 inline-block mb-4`}>
                            <img 
                                src={qrCodeImage} 
                                alt="QR Code" 
                                className="block mx-auto mb-2 h-72 w-72" />
                            <button
                                onClick={downloadQRCode}
                                className={`bg-green-500 text-white px-4 py-2  rounded-md hover:bg-${darkMode ? 'blue-800' : 'blue-600'} focus:outline-none focus:ring-2 focus:ring-${darkMode ? 'blue-500' : 'blue-200'}`}
                            >
                                Download QR Code
                            </button>
                        </div>
                    )}
                    {!qrCodeImage && <p className={`${darkMode ? "text-white" : ""} font-semibold`}>Please input a URL above to generate the QR code.</p>}
                </div>
            </div>
        </section>
    );
};

export default MainPage;
