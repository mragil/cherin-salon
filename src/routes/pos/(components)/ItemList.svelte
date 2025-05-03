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

	{#if filteredItems.length === 0}
		<p class="mt-5 text-2xl font-bold">{searchTerm} Not Found</p>
	{/if}
</div>

<div class="grid grid-cols-2 lg:grid-cols-4 gap-5 overflow-clip">
	{#each filteredItems as item}
		<Card.Root
			class="pressed text-center bg-pink-200 overflow-ellipsis"
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
