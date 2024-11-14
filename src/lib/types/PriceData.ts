import type { UTCTimestamp } from 'lightweight-charts';

type Candle = [time: UTCTimestamp, open: number, high: number, low: number, close: number];
type CandleObject = { time: UTCTimestamp; open: number; high: number; low: number; close: number };

export type CandleArray = Candle[];
export type CandleObjectArray = CandleObject[];
