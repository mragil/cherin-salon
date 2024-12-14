<script>
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CreateItemDialog from './(components)/CreateItemDialog.svelte';
	import ItemTable from './(components)/ItemTable.svelte';

	let { data } = $props();
</script>

<h1 class="text-3xl font-bold">Items</h1>
{#await data.categories then categories}
	<CreateItemDialog {categories}/>
{/await}
{#await data.items}
	<div class="flex gap-4">
		<Skeleton class="h-full w-full" />
	</div>
{:then items}
	<ItemTable {items} />
{/await}
