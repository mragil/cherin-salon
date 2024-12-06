<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Category } from '$lib/types';
	import { formatRupiah } from '$lib/utils';

	let { categories }: { categories: Category[] } = $props();
</script>

<Table.Root>
	<Table.Caption>A list of your category.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]">#</Table.Head>
			<Table.Head>Name</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each categories as category, index}
			<Table.Row>
				<Table.Cell>{index + 1}</Table.Cell>
				<Table.Cell>{category.label}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
