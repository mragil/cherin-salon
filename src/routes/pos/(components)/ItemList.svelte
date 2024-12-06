<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { ItemListProps } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { items, onPress }: ItemListProps = $props();
	let searchTerm = $state('');
	let filteredItems = $state(items);
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
		class="w-2/5 p-3 border-primary focus:outline-none border-b-2 border-b-primary bg-[#f2f3f4]"
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
			class="pressed max-w-64 max-h-40 flex-1 text-center bg-pink-200"
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
