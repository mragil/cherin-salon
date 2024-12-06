<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { CategoryListProps } from '$lib/types';

	let { categories }: CategoryListProps = $props();
	let selectedCategory = $state($page.url.searchParams.get('category') || 'All');
</script>

<div class="grid grid-cols-4 gap-3 text-center">
	{#each categories as category}
		<Badge
			class="pressed h-8 w-32 border-2 border-black"
			variant={selectedCategory !== category.value ? 'outline' : undefined}
			onclick={() => {
				selectedCategory = category.value;
				const newUrl = new URL($page.url);
				newUrl?.searchParams?.set('category', category.value);
				goto(newUrl);
			}}
			>{category.label}
		</Badge>
	{/each}
</div>
