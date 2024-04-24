"use client"
import React, { useState } from 'react';

const InputShortener = () => {
    const [url, setUrl] = useState('');
    const [shortenLink, setShortenLink] = useState('');
    const [welcomeVisible, setWelcomeVisible] = useState(true); // State to control visibility of welcome message

    const shortenURL = async () => {
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Shortened URL:", data.shortUrl);
                setShortenLink(data.shortUrl);
                setWelcomeVisible(false); // Hide welcome message after shortening URL
            } else {
                console.error("Failed to shorten URL:", data.error);
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Network or other error:", error);
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="animated-gradient flex items-center justify-center p-4 w-full max-w-md mx-auto rounded-lg shadow-md mt-10">
            <div>
                {welcomeVisible && ( // Render welcome message if welcomeVisible is true
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 animate-pulse">
                        Welcome to MadeShort!
                    </h1>
                )}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    URL <span className="text-purple-500">Shortener</span>
                </h1>
                <div className="flex items-center justify-between">
                    <input 
                        type="text" 
                        placeholder="Enter your URL here" 
                        className="flex-grow p-2 border rounded border-gray-300 focus:outline-none focus:border-purple-500 transition-colors text-black"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors" onClick={shortenURL}>
                        Shorten
                    </button>
                </div>
                {shortenLink && (
                    <p className="text-center mt-2">Shortened URL: <a href={shortenLink} target="_blank" rel="noopener noreferrer">{shortenLink}</a></p>
                )}
            </div>
        </div>
    );
};

export default InputShortener;

