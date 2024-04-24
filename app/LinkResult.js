"use client"
import React, { useState } from 'react';

const LinkResult = () => {
    const [ShortenLink, setShortenLink] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(ShortenLink)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy the link: ', err);
            });
    };

    return (
        <div className='result flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto'>
            <p className="text-center">{ShortenLink || "Your shortened link will appear here"}</p>
            <button 
                onClick={handleCopy} 
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Copy to Clipboard
            </button>
        </div>
    );
    
};
export default LinkResult;