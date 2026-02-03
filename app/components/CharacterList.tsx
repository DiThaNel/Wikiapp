"use client";

import React from 'react';
import CharacterCard from './CharacterCard';
import { Hunters } from '@/data/characters';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CharacterListProps {
    characters: typeof Hunters;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    const { searchQuery } = useSearch();

    const filteredCharacters = characters.filter(hunter => 
        hunter.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 justify-items-center"
        >
            <AnimatePresence>
                {filteredCharacters.map((hunter) => (
                    <motion.div
                        key={hunter.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CharacterCard
                            {...hunter}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default CharacterList;
