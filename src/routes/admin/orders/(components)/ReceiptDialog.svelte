<script lang="ts">
	import Receipt from '$lib/components/common/Receipt.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { ReceiptData } from '$lib/types';

	let {
		receiptData,
		shouldPrintReceipt = $bindable(),
		printReceipt
	}: { receiptData: ReceiptData; shouldPrintReceipt: boolean; printReceipt: () => void } = $props();
</script>

<Dialog.Root bind:open={shouldPrintReceipt}>
	<Dialog.Trigger />
	<Dialog.Content class="h-full overflow-y-scroll">
		<Receipt receipt={receiptData} />
		<Button onclick={printReceipt}>PRINT</Button>
	</Dialog.Content>
</Dialog.Root>
