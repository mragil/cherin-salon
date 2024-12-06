<script>
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CategoryTable from './(components)/CategoryTable.svelte';

	let { data } = $props();
</script>

<h1 class="text-3xl font-bold">Categories</h1>
{#await data.categories}
	<div class="flex gap-4">
		<Skeleton class="h-full w-full" />
	</div>
{:then categories}
	<CategoryTable {categories} />
{/await}
