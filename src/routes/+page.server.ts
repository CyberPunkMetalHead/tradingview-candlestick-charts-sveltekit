import CoinGecko from '$lib/providers/PriceDataProvider';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

const cg = new CoinGecko(env.CG_API_KEY ?? '');

export const load: PageServerLoad = async (request) => {
	const searchParams = new URL(request.url).searchParams;
	const coin = searchParams.get('coin');
	const days = searchParams.get('days');

	try {
		const chartData = await cg.getHistoricalData(coin?.toLowerCase() ?? 'bitcoin', days ?? '7');

		if (!chartData || chartData.length === 0) {
			// If no data is found, return a 404 error
			throw error(404, 'Not found');
		}
		return {
			chartData
		};
	} catch (err) {
		console.error(err);
		throw error(500, 'Error fetching chart data');
	}
};
