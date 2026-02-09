
import React, { useState, useCallback } from 'react';
import { Screen, GameMode, Operation, GameSettings, TimeSetting, RandomOperation, RandomLevel } from './types';
import HomeScreen from './components/HomeScreen';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import SettingsModal from './components/SettingsModal';
import RandomSetupScreen from './components/RandomSetupScreen';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>(Screen.Home);
    const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [timePerQuestion, setTimePerQuestion] = useState<TimeSetting>(10);

    const handleStartMultiplicationTable = useCallback(() => {
        setScreen(Screen.Setup);
    }, []);

    const handleStartRandomChallenge = useCallback(() => {
        setScreen(Screen.RandomSetup);
    }, []);
    
    const handleSetupComplete = useCallback((operation: Operation, numbers: number[]) => {
        setGameSettings({
            mode: GameMode.MultiplicationTable,
            operation: operation,
            numbers: numbers,
            timePerQuestion: timePerQuestion,
        });
        setScreen(Screen.Game);
    }, [timePerQuestion]);
    
    const handleRandomSetupComplete = useCallback((operation: RandomOperation, level: RandomLevel) => {
        setGameSettings({
            mode: GameMode.RandomChallenge,
            timePerQuestion: timePerQuestion,
            randomOperation: operation,
            randomLevel: level,
        });
        setScreen(Screen.Game);
    }, [timePerQuestion]);

    const handleBackToHome = useCallback(() => {
        setGameSettings(null);
        setScreen(Screen.Home);
    }, []);
    
    const handleTimeChange = useCallback((time: TimeSetting) => {
        setTimePerQuestion(time);
        setIsSettingsOpen(false);
    }, []);

    const renderScreen = () => {
        switch (screen) {
            case Screen.Setup:
                return <SetupScreen onStartGame={handleSetupComplete} onBack={handleBackToHome} />;
            case Screen.RandomSetup:
                return <RandomSetupScreen onStartGame={handleRandomSetupComplete} onBack={handleBackToHome} />;
            case Screen.Game:
                if (gameSettings) {
                    return <GameScreen settings={gameSettings} onEndGame={handleBackToHome} />;
                }
                // Fallback to home if settings are missing
                return <HomeScreen onStartMultiplicationTable={handleStartMultiplicationTable} onStartRandomChallenge={handleStartRandomChallenge} onOpenSettings={() => setIsSettingsOpen(true)} />;
            case Screen.Home:
            default:
                return <HomeScreen onStartMultiplicationTable={handleStartMultiplicationTable} onStartRandomChallenge={handleStartRandomChallenge} onOpenSettings={() => setIsSettingsOpen(true)} />;
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-900">
            <div className="w-full max-w-md mx-auto">
                {renderScreen()}
            </div>
            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentTime={timePerQuestion}
                onTimeChange={handleTimeChange}
            />
        </div>
    );
};

export default App;
