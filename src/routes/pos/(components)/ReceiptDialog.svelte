<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import Receipt from '$lib/components/common/Receipt.svelte';

	let { shop, shouldPrintReceipt = $bindable(), onClosePrint, savedOrder, printReceipt } = $props();
</script>

<Dialog.Root bind:open={shouldPrintReceipt} onOpenChange={onClosePrint}>
	<Dialog.Trigger />
	<Dialog.Content class="h-full overflow-y-scroll">
		<Receipt
			receipt={{
				...shop.getMappedData(),
				id: savedOrder.id,
				transactionDate: savedOrder.created
			}}
		/>
		<Button onclick={printReceipt}>PRINT</Button>
	</Dialog.Content>
</Dialog.Root>
