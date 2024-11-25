<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { CategoryListProps } from '$lib/types';

	let { categories }: CategoryListProps = $props();
	let selectedCategory = $state($page.url.searchParams.get('category') || categories[0].value);
</script>

<div class="flex gap-2">
	{#each categories as category}
		<Badge
			class="pressed"
			variant={selectedCategory !== category.value ? 'outline' : undefined}
			onclick={() => {
				selectedCategory = category.value;
				goto(`?category=${category.value}`);
			}}
			>{category.label}
		</Badge>
	{/each}
</div>
