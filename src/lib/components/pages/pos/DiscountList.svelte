<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { DiscountListProps } from '$lib/types';

	let { discounts, onSelected, selected }: DiscountListProps = $props();
</script>

<div class="grid grid-cols-3 gap-2 text-sm">
	{#each discounts as discount}
		<Badge
			class="pressed"
			variant={selected !== discount ? 'outline' : undefined}
			onclick={() => {
				if (selected === discount) {
					selected = 0;
				} else {
					selected = discount;
				}
				onSelected(selected);
			}}
			>{discount}%
		</Badge>
	{/each}
</div>
