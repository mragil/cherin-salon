<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { ItemListProps } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { items, onPress }: ItemListProps = $props();
	let searchTerm = $state('');
	let filteredItems = $state(items);
	$inspect(filteredItems);
	$effect(() => {
		if (searchTerm !== '') {
			filteredItems = items.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return;
		}
		filteredItems = items;
	});
</script>

<div class="mb-5">
	<input
		type="text"
		class="w-2/5 p-3 border-primary focus:outline-none"
		placeholder="Search by name"
		bind:value={searchTerm}
	/>
</div>

<div class="flex flex-wrap items-center justify-center gap-4">
	{#if filteredItems.length === 0}
		<p class="mt-20 text-2xl font-bold">{searchTerm} Not Found</p>
	{/if}
	{#each filteredItems as item}
		<Card.Root
			class="pressed max-w-64 flex-1 text-center"
			onclick={() => {
				onPress(item);
			}}
		>
			<Card.Content class="font-bold">
				<p>{item.name}</p>
				<p>{formatRupiah(item.price)}</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
