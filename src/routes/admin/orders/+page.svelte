<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { DateValue } from '@internationalized/date';
	import DateFilter from './(components)/DateFilter.svelte';
	import OrderTable from './(components)/OrderTable.svelte';

	let { data } = $props();
	let isOpenFilter = $state(false);

	const onSelectedDate = (selectedDate: DateValue) => {
		console.log(selectedDate);
	};
</script>

<h1 class="text-3xl font-bold">Orders</h1>
{#await data.orders}
	<div class="flex gap-4">
		<Skeleton class="h-full w-full bg-gray-700" />
	</div>
{:then orders}
	<DateFilter {onSelectedDate} {isOpenFilter}/>
	<OrderTable {orders} />
{/await}
