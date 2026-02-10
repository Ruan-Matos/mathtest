
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameSettings, GameMode, Operation, Question, RandomLevel } from '../types';
import BackIcon from './icons/BackIcon';

interface GameScreenProps {
    settings: GameSettings;
    onEndGame: () => void;
}

type Feedback = 'correct' | 'incorrect' | 'none';

const GameScreen: React.FC<GameScreenProps> = ({ settings, onEndGame }) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<Feedback>('none');
    const [isAnswering, setIsAnswering] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const timerKey = useRef(0);

    const questionsRef = useRef<Question[]>([]);
    const questionIndexRef = useRef(0);

    const generateRandomQuestion = useCallback((): Question => {
        const { randomOperation, randomLevel } = settings;
            
        let op: Operation;
        if (randomOperation === 'ALL') {
            const availableOps = [Operation.Addition, Operation.Subtraction, Operation.Multiplication];
            op = availableOps[Math.floor(Math.random() * availableOps.length)];
        } else {
            op = randomOperation as Operation;
        }

        const min = randomLevel === RandomLevel.Tens ? 10 : 100;
        const max = randomLevel === RandomLevel.Tens ? 99 : 999;
        const randomInRange = (minNum: number, maxNum: number) => Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

        if (op === Operation.Addition) {
            const num1 = randomInRange(min, max);
            const num2 = randomInRange(min, max);
            return { text: `${num1} + ${num2}`, answer: num1 + num2 };
        } else if (op === Operation.Subtraction) {
            const num1 = randomInRange(min, max);
            const num2 = randomInRange(min, num1); // Ensure positive result
            return { text: `${num1} - ${num2}`, answer: num1 - num2 };
        } else { // Multiplication
            const num1 = randomInRange(min, max);
            const num2 = randomInRange(2, 9); // Keep multiplier simple
            return { text: `${num1} x ${num2}`, answer: num1 * num2 };
        }
    }, [settings]);

    const showNextQuestion = useCallback(() => {
        let nextQuestion: Question;
        if (settings.mode === GameMode.MultiplicationTable) {
            if (questionIndexRef.current >= questionsRef.current.length) {
                // Reshuffle and start over
                questionsRef.current.sort(() => Math.random() - 0.5);
                questionIndexRef.current = 0;
            }
            nextQuestion = questionsRef.current[questionIndexRef.current];
            questionIndexRef.current += 1;
        } else {
            nextQuestion = generateRandomQuestion();
        }

        setQuestion(nextQuestion);
        setUserAnswer('');
        setFeedback('none');
        setIsAnswering(true);
        timerKey.current += 1;
        inputRef.current?.focus();
    }, [settings.mode, generateRandomQuestion]);

    useEffect(() => {
        if (settings.mode === GameMode.MultiplicationTable) {
            const allQuestions: Question[] = [];
            const { operation, numbers = [] } = settings;
            const multipliers = [3, 4, 5, 6, 7, 8, 9];

            for (const num1 of numbers) {
                for (const num2 of multipliers) {
                     if (operation === Operation.Division) {
                        const product = num1 * num2;
                        allQuestions.push({ text: `${product} ÷ ${num1}`, answer: num2 });
                    } else { // Multiplication
                        allQuestions.push({ text: `${num1} x ${num2}`, answer: num1 * num2 });
                    }
                }
            }
            allQuestions.sort(() => Math.random() - 0.5);
            questionsRef.current = allQuestions;
            questionIndexRef.current = 0;
        }
        showNextQuestion();
    }, [settings, showNextQuestion]);

    const handleAnswerSubmit = useCallback(() => {
        if (!isAnswering || !question) return;

        setIsAnswering(false);
        const isCorrect = parseInt(userAnswer, 10) === question.answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }

        setTimeout(showNextQuestion, 1000);
    }, [userAnswer, question, isAnswering, showNextQuestion]);

    useEffect(() => {
        if (settings.timePerQuestion === Infinity || !isAnswering) return;

        const timer = setTimeout(() => {
            setIsAnswering(false);
            setFeedback('incorrect');
            setTimeout(showNextQuestion, 1000);
        }, settings.timePerQuestion * 1000);

        return () => clearTimeout(timer);
    }, [question, settings.timePerQuestion, isAnswering, showNextQuestion]);

    const feedbackClasses: Record<Feedback, string> = {
        none: 'bg-slate-800',
        correct: 'bg-green-500/30',
        incorrect: 'bg-red-500/30',
    };
    
    return (
        <div className="flex flex-col h-[80vh] w-full p-4">
             <header className="relative flex items-center justify-between mb-4">
                <button onClick={onEndGame} className="text-slate-400 hover:text-cyan-400">
                    <BackIcon className="w-8 h-8" />
                </button>
                <div className="text-2xl font-bold text-yellow-400">
                    Pontos: <span className="text-3xl">{score}</span>
                </div>
            </header>
            
            {settings.timePerQuestion !== Infinity && (
                <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
                    {isAnswering && (
                        <div
                            key={timerKey.current}
                            className="bg-green-500 h-4 rounded-full timer-bar"
                            style={{ animationDuration: `${settings.timePerQuestion}s` }}
                        />
                    )}
                </div>
            )}

            <main className={`flex-grow flex flex-col items-center justify-center rounded-2xl p-6 transition-colors duration-300 ${feedbackClasses[feedback]}`}>
                <div className="text-7xl md:text-8xl font-bold text-white mb-8 tracking-wider">
                    {question?.text}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(); }}>
                    <input
                        ref={inputRef}
                        type="tel"
                        pattern="[0-9]*"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={!isAnswering}
                        className="bg-transparent border-b-4 text-white text-6xl md:text-7xl font-bold text-center w-64 focus:outline-none focus:border-cyan-400 transition-colors"
                        autoFocus
                    />
                </form>
            </main>
        </div>
    );
};

export default GameScreen;
