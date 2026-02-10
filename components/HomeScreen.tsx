
import React from 'react';
import GearIcon from './icons/GearIcon';
import Logo from './Logo';

interface HomeScreenProps {
    onStartMultiplicationTable: () => void;
    onStartRandomChallenge: () => void;
    onOpenSettings: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartMultiplicationTable, onStartRandomChallenge, onOpenSettings }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
            <Logo className="w-36 h-36 mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-12 drop-shadow-lg">
                Mestre da Matemática
            </h1>

            <div className="w-full max-w-sm space-y-5">
                <button
                    onClick={onStartMultiplicationTable}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-2xl py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Modo Tabuada
                </button>
                <button
                    onClick={onStartRandomChallenge}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-2xl py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                >
                    Desafio Aleatório
                </button>
            </div>

            <button
                onClick={onOpenSettings}
                className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Configurações"
            >
                <GearIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default HomeScreen;
