import { Currency } from '$lib/enums/VsCurrencyEnum';
import type { CandleArray, CandleObjectArray } from '$lib/types/PriceData';
import type { UTCTimestamp } from 'lightweight-charts';
import { env } from '$env/dynamic/private';

class CoinGecko {
	private root: string;
	private headers: Record<string, string>;

	constructor(apiKey: string) {
		this.root =
			env.API_TYPE === 'DEMO'
				? 'https://api.coingecko.com/api/v3'
				: 'https://pro-api.coingecko.com/api/v3';
		const auth_param = env.API_TYPE === 'DEMO' ? 'x-cg-demo-api-key' : 'x-cg-pro-api-key';

		this.headers = {
			accept: 'application/json',
			[auth_param]: apiKey
		};
	}

	async getHistoricalData(
		coinId: string,
		days: string,
		vsCurrency: Currency = Currency.USD
	): Promise<CandleObjectArray> {
		const requestUrl = `${this.root}/coins/${coinId}/ohlc?vs_currency=${vsCurrency}&days=${days}`;
		const response = await fetch(requestUrl, { headers: this.headers });
		const data: CandleArray = await response.json();

		return data.map(([time, open, high, low, close]) => ({
			// millisecond timestamp not supported so we convert to seconds
			time: (time / 1000) as UTCTimestamp,
			open,
			high,
			low,
			close
		}));
	}

	async getVsCurrencies(): Promise<string[]> {
		const requestUrl = `${this.root}/simple/supported_vs_currencies`;
		const response = await fetch(requestUrl, { headers: this.headers });
		return await response.json();
	}

	async getCoinIdByName(coinName: string): Promise<{ id: string; symbol: string; name: string }[]> {
		const requestUrl = `${this.root}/coins/list`;
		const response = await fetch(requestUrl, { headers: this.headers });
		const data = await response.json();

		return data.filter(
			(coin: { id: string; symbol: string; name: string }) =>
				coin.name.toLowerCase() === coinName.toLowerCase()
		);
	}
}

export default CoinGecko;
