
export enum Screen {
  Home = 'HOME',
  Setup = 'SETUP',
  RandomSetup = 'RANDOM_SETUP',
  Game = 'GAME',
}

export enum GameMode {
  MultiplicationTable = 'MULTIPLICATION_TABLE',
  RandomChallenge = 'RANDOM_CHALLENGE',
}

export enum Operation {
  Multiplication = 'MULTIPLICATION',
  Division = 'DIVISION',
  Addition = 'ADDITION',
  Subtraction = 'SUBTRACTION',
}

export type RandomOperation = Operation.Addition | Operation.Subtraction | Operation.Multiplication | 'ALL';

export enum RandomLevel {
    Tens = 'TENS', // 10-99
    Hundreds = 'HUNDREDS', // 100-999
}

export type TimeSetting = 5 | 10 | 30 | number; // Using number for Infinity

export interface GameSettings {
  mode: GameMode;
  timePerQuestion: TimeSetting;
  // For MultiplicationTable mode
  operation?: Operation.Multiplication | Operation.Division;
  numbers?: number[];
  // For RandomChallenge mode
  randomOperation?: RandomOperation;
  randomLevel?: RandomLevel;
}

export interface Question {
    text: string;
    answer: number;
}
