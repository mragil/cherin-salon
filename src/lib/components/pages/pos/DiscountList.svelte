<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { DiscountListProps } from '$lib/types';

	let { discounts, onSelected }: DiscountListProps = $props();
	let selectedDiscount = $state(0);
</script>

<div class="grid grid-cols-3 gap-2 text-sm">
	{#each discounts as discount}
		<Badge
			class="pressed"
			variant={selectedDiscount !== discount ? 'outline' : undefined}
			onclick={() => {
				if (selectedDiscount === discount) {
					selectedDiscount = 0;
				} else {
					selectedDiscount = discount;
				}
				onSelected(selectedDiscount);
			}}
			>{discount}%
		</Badge>
	{/each}
</div>
