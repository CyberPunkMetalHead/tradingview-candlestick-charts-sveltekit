<script lang="ts">
	import type { PageData } from './$types';
	import { createChart, type IChartApi } from 'lightweight-charts';
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: chartData = data.chartData;
	let chartContainer: HTMLDivElement;
	let chart: IChartApi | undefined = undefined;

	// Dropdown options
	const coins = ['bitcoin', 'ethereum', 'litecoin', 'solana', 'polkadot', 'aave'];
	const intervals = ['1', '7', '14', '30', '90', '180', '365', 'max'];

	// Defaults to this if no options selected
	let selectedCoin = 'bitcoin';
	let selectedInterval = '7';

	const updateQueryParams = () => {
		const url = new URL(window.location.href);
		url.searchParams.set('coin', selectedCoin);
		url.searchParams.set('days', selectedInterval);
		goto(url.toString(), { replaceState: true });
	};

	const createCandlestickChart = () => {
		if (chart) {
			// If the chart already exists, remove it before creating a new one
			chart.remove();
		}
		chart = createChart(chartContainer);
		const lineSeries = chart.addCandlestickSeries();
		lineSeries.setData(chartData);
	};

	onMount(() => {
		createCandlestickChart();
	});

	// Use afterUpdate to create the chart again after the data or selection changes
	afterUpdate(() => {
		if (chart && chartData) {
			createCandlestickChart();
		}
	});
</script>

<div class="flex h-screen w-full flex-col items-center gap-6 p-6">
	<h1 class="text-lg font-semibold">Interactive TradingView Chart</h1>
	<div class="mb-4 flex gap-4">
		<div class="flex flex-col">
			<span class="mb-1 text-sm font-semibold">Select Coin</span>
			<select
				bind:value={selectedCoin}
				on:change={updateQueryParams}
				class="rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				{#each coins as coin}
					<option value={coin}>{coin.charAt(0).toUpperCase() + coin.slice(1)}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col">
			<span class="mb-1 text-sm font-semibold">Select Interval (Days)</span>
			<select
				bind:value={selectedInterval}
				on:change={updateQueryParams}
				class="rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				{#each intervals as interval}
					<option value={interval}>{interval}</option>
				{/each}
			</select>
		</div>
	</div>
	<div bind:this={chartContainer} class="h-full w-full rounded border border-gray-300 shadow"></div>
</div>
