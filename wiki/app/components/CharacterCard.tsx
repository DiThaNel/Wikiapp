"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StarDescriptions } from '@/data/characters';

interface CharacterCardProps {
    id: number;
    nombre: string;
    edad: string;
    tipo: string;
    nem: string;
    img: string;
    estrellas: number;
    info: string;
    habilidad1?: string;
    habilidad2?: string;
    habilidad3?: string;
    habilidad4?: string;
    habilidad5?: string;
    habilidad6?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    nombre,
    edad,
    tipo,
    nem,
    img,
    estrellas,
    info,
    habilidad1,
    habilidad2,
    habilidad3,
    habilidad4,
    habilidad5,
    habilidad6,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Star icon helper
    const renderStars = (count: number) => {
        return (
            <div className="flex" title={StarDescriptions[count] || ""}>
                {[...Array(3)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < count ? 'text-yellow-400' : 'text-gray-400'}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div 
            className="group relative w-[330px] h-[499px] cursor-pointer perspective-1000 mx-auto my-4 transition-transform duration-300 hover:-translate-y-2"
            onClick={handleFlip}
        >
            <div className={`relative w-full h-full transition-all duration-700 transform preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* FRONT SIDES */}
                <div className="absolute w-full h-full backface-hidden bg-white border-[3px] border-double border-[#979797] rounded-lg shadow-xl">
                     {/* Header */}
                    <div className="absolute -top-5 left-4 right-6 z-10 bg-gradient-to-r from-[#333333] to-[#d4d4d4] opacity-90 rounded-md px-4 py-4 text-center text-white shadow-md">
                        <h2 className="text-md font-bold">{nombre}</h2>
                        <p className="text-sm opacity-90">{edad}</p>
                    </div>

                    {/* Avatar/Type Tooltip - Positioning it slightly differently due to absolute header */}
                    <div className="absolute -top-1 left-6 z-20" title={nem}>
                         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white">
                            <Image src={tipo} alt="Nem Type" width={40} height={40} className="object-cover" />
                         </div>
                    </div>
                     
                    {/* Stars - Absolute positioning to match previous layout feel */}
                    <div className="absolute -top-0 right-8 z-20">
                         {renderStars(estrellas)}
                    </div>

                    {/* Main Image */}
                    <div className="h-[75%] w-full relative mt-8">
                         <Image 
                            src={img} 
                            alt={nombre} 
                            fill
                            className="object-contain object-top pt-8"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         />
                    </div>

                    {/* Content/Info */}
                    <div className="relative bottom-0 w-full h-[auto] p-4 bg-[url('https://raw.githubusercontent.com/DiThaNel/Wikiapp/master/public/img/CardBg.jpg')] bg-contain text-justify overflow-y-auto border-t-[3px] border-double border-[#979797]">
                         <p className="text-[#1f1f1f] text-sm font-medium leading-tight">{info}</p>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border-[3px] border-double border-[#979797] rounded-lg shadow-xl">
                      {/* Header (Same as front) */}
                      <div className="absolute -top-5 left-4 right-6 z-10 bg-gradient-to-r from-[#333333] to-[#d4d4d4] opacity-90 rounded-md px-4 py-4 text-center text-white shadow-md">
                        <h2 className="text-md font-bold">{nombre}</h2>
                        <p className="text-sm opacity-90">{edad}</p>
                    </div>

                    {/* Avatar/Type Tooltip - Added to back side for consistency */}
                    <div className="absolute -top-1 left-6 z-20" title={nem}>
                         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white">
                            <Image src={tipo} alt="Nem Type" width={40} height={40} className="object-cover" />
                         </div>
                    </div>
                     
                    {/* Stars - Added to back side for consistency */}
                    <div className="absolute -top-0 right-8 z-20">
                         {renderStars(estrellas)}
                    </div>

                    <div className="w-full h-full pt-16 p-4 bg-[url('https://raw.githubusercontent.com/DiThaNel/Wikiapp/master/public/img/NEMbg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-around">
                        
                        {/* Abilities Layout - Attempts to mimic the circular structure of the original "posicion" classes without absolute chaos */}
                        {/* Top */}
                        <div className="flex flex-col items-center relative group/ability">
                             {habilidad1 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad1}>
                                      <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                        </div>

                        {/* Middle Row */}
                        <div className="flex w-full justify-between px-8 relative">
                             {habilidad2 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad2}>
                                    <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                             {habilidad3 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad3}>
                                    <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                        </div>

                         {/* Bottom Row */}
                         <div className="flex w-full justify-around px-12 relative">
                             {habilidad4 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad4}>
                                    <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                             {habilidad5 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad5}>
                                    <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                        </div>

                         {/* Bottom Center */}
                         <div className="flex flex-col items-center relative">
                             {habilidad6 && (
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black/20" title={habilidad6}>
                                    <Image src={tipo} alt="skill" width={48} height={48} className="opacity-75" />
                                </div>
                             )}
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Tailwind utilities for 3D flip - add these to globals.css if not working directly via JIT mapping, but arbitrary values usually work */}
            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .rotate-y-0 { transform: rotateY(0deg); }
            `}</style>
        </div>
    );
};

export default CharacterCard;
