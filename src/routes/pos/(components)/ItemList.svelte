<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { ItemListProps } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { items, onPress }: ItemListProps = $props();
</script>

<div class="flex flex-wrap justify-center items-center gap-4">
	{#each items as item}
		<Card.Root
			class="pressed flex-1 max-w-64 text-center"
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
