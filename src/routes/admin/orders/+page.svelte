<script lang="ts">
	import { goto } from '$app/navigation';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { DateValue } from '@internationalized/date';
	import DateFilter from './(components)/DateFilter.svelte';
	import OrderTable from './(components)/OrderTable.svelte';

	let { data } = $props();
	let isOpenFilter = $state(false);

	const onSelectedDate = (selectedDate: DateValue) => {
		const { day, month, year } = selectedDate;
		goto(`?transactionDate=${year}-${month}-${day < 10 ? `0${day}` : day}`);
	};
</script>

<h1 class="text-3xl font-bold">Orders</h1>
<DateFilter {onSelectedDate} {isOpenFilter} />
{#await data.orders}
	<Skeleton class="h-full w-full" />
{:then orders}
	{#if orders.length === 0}
		<div class="h-full flex items-center justify-center">
			<p class="text-9xl font-bold">Empty...</p>
		</div>
	{:else}
		<OrderTable {orders} />
	{/if}
{/await}
