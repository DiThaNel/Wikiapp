import React from 'react';
import CharacterCard from './CharacterCard';
import { Hunters } from '@/data/characters';

interface CharacterListProps {
    characters: typeof Hunters;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 justify-items-center">
            {characters.map((hunter) => (
                <CharacterCard
                    key={hunter.id}
                    {...hunter}
                />
            ))}
        </div>
    );
};

export default CharacterList;
