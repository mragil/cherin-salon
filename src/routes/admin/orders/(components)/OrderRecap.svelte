<script lang="ts">
	import type { Order } from '$lib/types';
	import { formatRupiah } from '$lib/utils';
	let { orders }: { orders: Order[] } = $props();

	const totalAmount = orders.reduce((acc, current) => {
		const total = acc + current.total;
		return total;
	}, 0);
</script>

<div class=" flex flex-col  gap-2 border-2 rounded-md p-2">
	<div class="flex">
		<p>Total Order:</p>
		<p class="font-bold">{orders.length}</p>
	</div>
	<div class="flex">
		<p>Total Amount:&nbsp;</p>
		<p class="font-bold">{formatRupiah(totalAmount)}</p>
	</div>
</div>
