"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
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
    id,
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

    // Custom Tooltip Component
    const Tooltip = ({ content, children, side = "bottom" }: { content: string, children: React.ReactNode, side?: "top" | "bottom" | "left" | "right" }) => {
        
        const positionClasses = {
            top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
            bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
            left: "right-full mr-2 top-1/2 -translate-y-1/2",
            right: "left-full ml-2 top-1/2 -translate-y-1/2"
        };

        const arrowClasses = {
            top: "top-full left-1/2 -translate-x-1/2 border-t-black/80 border-l-transparent border-r-transparent border-b-transparent",
            bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-black/80 border-l-transparent border-r-transparent border-t-transparent",
            left: "left-full top-1/2 -translate-y-1/2 border-l-black/80 border-t-transparent border-b-transparent border-r-transparent",
            right: "right-full top-1/2 -translate-y-1/2 border-r-black/80 border-t-transparent border-b-transparent border-l-transparent"
        };

        return (
            <div className="group/tooltip relative flex items-center justify-center">
                {children}
                <div className={`absolute ${positionClasses[side]} w-max max-w-[300px] px-3 py-2 bg-black/80 text-white text-md rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none z-[9999] text-center border border-white/10`}>
                    {content}
                    <div className={`absolute border-8 ${arrowClasses[side]}`} />
                </div>
            </div>
        );
    };

    // Star icon helper
    const renderStars = (count: number) => {
        return (
            <Tooltip content={StarDescriptions[count] || ""} side="bottom">
                <div className="flex space-x-0.5">
                    {[...Array(3)].map((_, i) => (
                        <span 
                            key={i} 
                            className={`text-xl transition-all duration-300 hover:scale-125 ${i < count ? 'text-yellow-400 hover:text-yellow-400 hover:drop-shadow-md' : 'text-gray-400 opacity-80'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </Tooltip>
        );
    };

    return (
        <Tilt 
            tiltMaxAngleX={5} 
            tiltMaxAngleY={5} 
            perspective={1000} 
            scale={1.02} 
            transitionSpeed={1000}
            className="mx-auto my-4 relative hover:z-[9999] transition-all duration-300"
        >
            <div 
                className="group relative w-[330px] h-[499px] cursor-pointer preserve-3d transition-transform duration-300 will-change-transform"
                onClick={handleFlip}
            >
                <div className={`relative w-full h-full transition-all duration-700 transform preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* FRONT SIDE */}
                <div className="absolute w-full h-full backface-hidden bg-white border-[3px] border-double border-[#979797] rounded-lg shadow-xl" style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}>
                     {/* Header */}
                    {/* Top Section */}
                    <div className="absolute -top-6 left-4 right-4 flex justify-between items-center px-4 py-4 z-20 bg-gradient-to-r from-[#333333] to-[#d4d4d4] opacity-90 rounded-md shadow-md glitch-fix">
                        {/* Type (Left) */}
                        <Tooltip content={nem} side="bottom">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white shrink-0 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg z-30">
                                <Image src={tipo} alt="Nem Type" width={80} height={80} className="object-cover" />
                            </div>
                        </Tooltip>

                        {/* Header (Center) */}
                        <div className="text-center text-white mx-2">
                             <h2 className="text-xl font-semibold leading-tight">{nombre}</h2>
                             <p className="text-lg opacity-100 leading-none">{edad}</p>
                        </div>

                        {/* Stars (Right) */}
                        <div className="shrink-0">
                            {renderStars(estrellas)}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="absolute top-10 bottom-0 w-full flex flex-col justify-end rounded-b-lg overflow-hidden">
                        {/* Image */}
                        <div className="relative flex-grow w-full min-h-0">
                             <Image 
                                src={img} 
                                alt={nombre} 
                                fill
                                quality={100}
                                priority={id <= 4} // Load first few images eagerly
                                className="object-contain object-top"
                                sizes="500px"
                                unoptimized={true}
                             />
                        </div>

                        {/* Content/Info */}
                        <div className="relative w-full flex-shrink-0 p-4 text-justify border-t-[3px] border-double border-[#979797] bg-white bg-[url('https://raw.githubusercontent.com/DiThaNel/Wikiapp/master/wiki/public/img/CardBg.jpg')] bg-contain">
                             <p className="text-[#1f1f1f] text-md font-medium leading-tight">{info}</p>
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border-[3px] border-double border-[#979797] rounded-lg shadow-xl" style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}>
                      {/* Header*/}
                      {/* Top Section */}
                      <div className="absolute -top-6 left-4 right-4 flex justify-between items-center px-4 py-4 z-20 bg-gradient-to-r from-[#333333] to-[#d4d4d4] opacity-90 rounded-md shadow-md glitch-fix">
                        {/* Type (Left) */}
                        <Tooltip content={nem} side="bottom">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white shrink-0 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg z-30">
                                <Image src={tipo} alt="Nem Type" width={80} height={80} className="object-cover" />
                            </div>
                        </Tooltip>

                        {/* Header (Center) */}
                        <div className="text-center text-white mx-2">
                             <h2 className="text-xl font-semibold leading-tight">{nombre}</h2>
                             <p className="text-lg opacity-100 leading-none">{edad}</p>
                        </div>

                        {/* Stars (Right) */}
                        <div className="shrink-0">
                            {renderStars(estrellas)}
                        </div>
                    </div>

                    <div className="w-full h-full pt-0 p-4 bg-[url('https://raw.githubusercontent.com/DiThaNel/Wikiapp/master/public/img/NEMbg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center relative">
                        
                        {/* Hexagon Container */}
                        <div className="relative w-[260px] h-[300px] flex items-center justify-center mt-8">
                            
                            {/* SVG Lines */}
                            <svg className="absolute w-full h-full pointer-events-none z-0" viewBox="0 0 260 300">
                                <polygon 
                                    points="130,10 242.5,75 242.5,205 130,270 17.5,205 17.5,75" 
                                    className="fill-transparent stroke-white stroke-2 opacity-60"
                                />
                            </svg>

                            {/* Ability 1 - Top (Refuerzo) */}
                            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad1 && (
                                    <Tooltip content={habilidad1} side="top">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Ability 2 - Top Right (Emision) */}
                            <div className="absolute top-[75px] right-[17.5px] translate-x-1/2 -translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad2 && (
                                    <Tooltip content={habilidad2} side="left">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Ability 3 - Bottom Right (Manipulacion) */}
                            <div className="absolute bottom-[95px] right-[17.5px] translate-x-1/2 translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad3 && (
                                    <Tooltip content={habilidad3} side="left">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Ability 4 - Bottom (Especializacion) */}
                            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad4 && (
                                    <Tooltip content={habilidad4} side="bottom">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Ability 5 - Bottom Left (Materializacion) */}
                            <div className="absolute bottom-[95px] left-[17.5px] -translate-x-1/2 translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad5 && (
                                    <Tooltip content={habilidad5} side="right">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Ability 6 - Top Left (Transmutacion) */}
                            <div className="absolute top-[75px] left-[17.5px] -translate-x-1/2 -translate-y-1/2 z-10 hover:z-[70]">
                                {habilidad6 && (
                                    <Tooltip content={habilidad6} side="right">
                                        <div className="w-[45px] h-[45px] rounded-full border-2 border-white overflow-hidden bg-black/40 transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-lg">
                                            <Image src={tipo} alt="skill" width={80} height={80} className="object-cover opacity-90" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* View Details Button */}
                    <Link 
                        href={`/character/${id}`}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-1.5 bg-black/80 hover:bg-black text-white text-sm font-semibold rounded-full border border-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group/btn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span> Ficha </span>
                        <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </Link>

                </div>

            </div>
            
            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { 
                    backface-visibility: hidden; 
                    -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 { transform: rotateY(180deg); }
                .rotate-y-0 { transform: rotateY(0deg); }
                /* Fix for Firefox/Edge rendering artifacts during flip */
                .glitch-fix {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transform: translateZ(1px);
                    transform-style: preserve-3d;
                }
            `}</style>
            </div>
        </Tilt>
    );
};

export default CharacterCard;
