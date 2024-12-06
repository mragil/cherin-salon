<script lang="ts">
	import { PUBLIC_SHOP_NAME } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { Order, ReceiptData } from '$lib/types';
	import { formatRupiah } from '$lib/utils';
	import ReceiptDialog from './ReceiptDialog.svelte';

	const printer = new ReceiptPrinter();
	let { orders }: { orders: Order[] } = $props();
	let shouldPrintReceipt = $state(false);
	let selectedReceipt = $state<ReceiptData | null>(null);

	function printReceipt() {
		if (selectedReceipt) {
			printer.printData(selectedReceipt);
		}
	}
</script>

<Table.Root>
	<Table.Caption>A list of your orders.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[50px]">#</Table.Head>
			<Table.Head>Transaction Date</Table.Head>
			<Table.Head>Transaction ID</Table.Head>
			<Table.Head>Cashier</Table.Head>
			<Table.Head>Amount</Table.Head>
			<Table.Head>Receipt</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each orders as order, index}
			<Table.Row>
				<Table.Cell>{index + 1}</Table.Cell>
				<Table.Cell>{new Date(order.created).toLocaleString('id-ID')}</Table.Cell>
				<Table.Cell>{order.id}</Table.Cell>
				<Table.Cell>{order.cashier}</Table.Cell>
				<Table.Cell>{formatRupiah(order.total)}</Table.Cell>
				<Table.Cell>
					<Button
						onclick={() => {
							shouldPrintReceipt = true;
							selectedReceipt = {
								...order,
								transactionDate: order.created,
								name: PUBLIC_SHOP_NAME
							};
						}}>View Receipt</Button
					>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

<ReceiptDialog {printReceipt} receiptData={selectedReceipt!} bind:shouldPrintReceipt />
