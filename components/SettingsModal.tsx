
import React from 'react';
import { TimeSetting } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTime: TimeSetting;
    onTimeChange: (time: TimeSetting) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentTime, onTimeChange }) => {
    if (!isOpen) return null;

    const timeOptions: { label: string; value: TimeSetting }[] = [
        { label: '5s', value: 5 },
        { label: '10s', value: 10 },
        { label: '30s', value: 30 },
        { label: 'Infinito', value: Infinity },
    ];

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl p-8 shadow-2xl w-full max-w-xs"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Tempo por Questão</h2>
                <div className="space-y-3">
                    {timeOptions.map(({ label, value }) => (
                        <button
                            key={label}
                            onClick={() => onTimeChange(value)}
                            className={`w-full text-lg font-semibold py-3 rounded-lg transition-colors ${
                                currentTime === value
                                    ? 'bg-cyan-500 text-white shadow-md'
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
