<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { ExpandedItem } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { items }: { items: ExpandedItem[] } = $props();
</script>

<Table.Root>
	<Table.Caption>A list of your item.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]">#</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Category</Table.Head>
			<Table.Head>Price</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each items as item, index}
			<Table.Row>
				<Table.Cell>{index + 1}</Table.Cell>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell>{item.expand.category.label}</Table.Cell>
				<Table.Cell>{formatRupiah(item.price)}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
