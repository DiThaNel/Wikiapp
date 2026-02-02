import React from 'react';
import Image from 'next/image';

interface HeaderProps {
    onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    return (
        <div className="flex-grow">
            <header className="static w-full text-white shadow-md bg-gradient-to-r from-[#333333] to-[#d4d4d4] opacity-90">
                <div className="px-6 min-h-[64px] flex items-center justify-between">
                    {/* Title / Logo Area */}
                    <div className="flex-grow flex sm:block">
                         {/* Placeholder for Logo - assuming path from previous code */}
                         {/* Using a simple div or text if image is missing, but structure is ready for Image */}
                            <Image 
                                src="/img/Logo.png" 
                                alt="Wiki Hunter Logo" 
                                width={130} 
                                height={55} 
                                className="object-contain"
                                priority
                            />
                    </div>

                    {/* Search Area */}
                    <div className="relative rounded bg-white/15 hover:bg-white/25 ml-0 w-full sm:ml-2 sm:w-auto border-[2.5px] border-double border-[#686868] transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-[#686868]">
                            <svg 
                                className="h-5 w-5" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={onSearch}
                            className="block w-full sm:w-[180px] sm:focus:w-[200px] pl-9 pr-3 py-1.5 text-black placeholder-black/70 bg-transparent rounded focus:outline-none transition-all duration-300 font-sans text-base"
                            aria-label="search"
                        />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
