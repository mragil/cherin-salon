<script>
	import { Skeleton } from '$lib/components/ui/skeleton';
	import OrderTable from './(components)/OrderTable.svelte';

	let { data } = $props();
</script>

<h1 class="text-3xl font-bold">Orders</h1>
{#await data.orders}
	<div class="flex gap-4">
		<Skeleton class="h-full w-full" />
	</div>
{:then orders}
	<OrderTable {orders} />
{/await}
