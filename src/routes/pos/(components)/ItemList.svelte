<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { ItemListProps } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { items, onPress }: ItemListProps = $props();
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
	{#each items as item}
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
