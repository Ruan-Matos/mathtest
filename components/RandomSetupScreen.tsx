import React, { useState } from 'react';
// Fix: Import Operation enum to use its members for type safety.
import { RandomOperation, RandomLevel, Operation } from '../types';
import BackIcon from './icons/BackIcon';

interface RandomSetupScreenProps {
    onStartGame: (operation: RandomOperation, level: RandomLevel) => void;
    onBack: () => void;
}

const RandomSetupScreen: React.FC<RandomSetupScreenProps> = ({ onStartGame, onBack }) => {
    const [operation, setOperation] = useState<RandomOperation>('ALL');
    const [level, setLevel] = useState<RandomLevel>(RandomLevel.Tens);

    const operationOptions: { label: string; value: RandomOperation }[] = [
        // Fix: Changed string literals to Operation enum members to match the RandomOperation type.
        { label: 'Soma', value: Operation.Addition },
        { label: 'Subtração', value: Operation.Subtraction },
        { label: 'Multiplicação', value: Operation.Multiplication },
        { label: 'Aleatório', value: 'ALL' },
    ];
    
    const levelOptions: { label: string; value: RandomLevel }[] = [
        { label: 'Dezenas (10-99)', value: RandomLevel.Tens },
        { label: 'Centenas (100-999)', value: RandomLevel.Hundreds },
    ];

    return (
        <div className="flex flex-col w-full h-full p-4">
            <header className="relative flex items-center justify-center mb-8">
                <button onClick={onBack} className="absolute left-0 text-slate-400 hover:text-cyan-400">
                    <BackIcon className="w-8 h-8" />
                </button>
                <h1 className="text-3xl font-bold text-cyan-400">Desafio Aleatório</h1>
            </header>

            <div className="flex-grow flex flex-col justify-center space-y-8">
                {/* Operation Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-center text-slate-300">Operação</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {operationOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setOperation(opt.value)}
                                className={`py-3 text-lg font-bold rounded-lg transition-colors ${operation === opt.value ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Level Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-center text-slate-300">Nível</h2>
                     <div className="grid grid-cols-1 gap-3">
                        {levelOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setLevel(opt.value)}
                                className={`py-3 text-lg font-bold rounded-lg transition-colors ${level === opt.value ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onStartGame(operation, level)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-2xl py-5 rounded-xl shadow-lg mt-8 transform hover:scale-105 transition-transform duration-200"
            >
                INICIAR
            </button>
        </div>
    );
};

export default RandomSetupScreen;
