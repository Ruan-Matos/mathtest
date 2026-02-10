
import React, { useState } from 'react';
import { Operation } from '../types';
import BackIcon from './icons/BackIcon';

interface SetupScreenProps {
    onStartGame: (operation: Operation, numbers: number[]) => void;
    onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onBack }) => {
    const [operation, setOperation] = useState<Operation.Multiplication | Operation.Division>(Operation.Multiplication);
    const defaultNumbers = [4, 5, 6, 7, 8, 9];

    const handleStart = () => {
        onStartGame(operation, defaultNumbers);
    };

    return (
        <div className="flex flex-col w-full h-full p-4">
            <header className="relative flex items-center justify-center mb-8">
                <button onClick={onBack} className="absolute left-0 text-slate-400 hover:text-cyan-400">
                    <BackIcon className="w-8 h-8" />
                </button>
                <h1 className="text-3xl font-bold text-cyan-400">Configurar Tabuada</h1>
            </header>
            
            <div className="flex-grow flex flex-col justify-center space-y-8">
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-center text-slate-300">Escolha a Operação</h2>
                    <div className="grid grid-cols-2 gap-3 bg-slate-800 p-1 rounded-xl">
                        <button
                            onClick={() => setOperation(Operation.Multiplication)}
                            className={`py-3 text-lg font-bold rounded-lg transition-colors ${operation === Operation.Multiplication ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                            Multiplicação
                        </button>
                        <button
                            onClick={() => setOperation(Operation.Division)}
                            className={`py-3 text-lg font-bold rounded-lg transition-colors ${operation === Operation.Division ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                            Divisão
                        </button>
                    </div>
                </div>
            </div>
            
            <button
                onClick={handleStart}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-2xl py-5 rounded-xl shadow-lg mt-8 transform hover:scale-105 transition-transform duration-200"
            >
                INICIAR
            </button>
        </div>
    );
};

export default SetupScreen;
