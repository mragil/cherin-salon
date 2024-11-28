<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import Cart from '$lib/components/pages/pos/Cart.svelte';
	import CategoryList from '$lib/components/pages/pos/CategoryList.svelte';
	import ItemList from '$lib/components/pages/pos/ItemList.svelte';
	import { pb } from '$lib/pocketbase';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';

	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { PageData } from './$types';
	import type { RecordModel } from "pocketbase";
	import Button from "$lib/components/ui/button/button.svelte";

	let { data }: { data: PageData } = $props();
	let shouldPrintReceipt = $state(false);
	let savedOrder: RecordModel;
	const shop = new ShopData();
	const printer = new ReceiptPrinter();

	async function saveOrder() {
		try {
			savedOrder = await pb.collection('orders').create(shop.getMappedData());
			shouldPrintReceipt = true;
		} catch (error) {
			alert('Error Saved DB!!!');
		}
	}

	function printReceipt() {
		printer.printData({...shop.getMappedData(), id: savedOrder.id, transactionDate: savedOrder.created});
	}

	function onClosePrint(open: boolean) {
		if(!open) {
			shop.reset();
		}
	}
</script>

<div class="flex flex-row justify-center gap-4 p-4">
	<!-- Shop -->
	<div class="flex h-[47rem] w-4/6 flex-col gap-5 rounded-lg bg-secondary p-5">
		{#await data.categories}
			Loading categories...
		{:then categories}
			<CategoryList {categories} />
		{/await}
		<div class="overflow-y-scroll scrollbar-hide">
			{#await data.items}
				Loading items...
			{:then items}
				<ItemList {items} onPress={(data: Item) => shop.addToCart(data)} />
			{/await}
		</div>
	</div>
	<!-- End Shop -->

	<!-- Cart -->
	<div class="h-[47rem] w-2/6 overflow-y-scroll scrollbar-hide">
		<Cart {shop} onSubmit={saveOrder} />
	</div>
	<!-- End Cart -->
</div>

<Dialog.Root bind:open={shouldPrintReceipt} onOpenChange={onClosePrint}>
  <Dialog.Trigger/>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Print Receipt</Dialog.Title>
      <Dialog.Description>
        <Button onclick={printReceipt}>PRINT</Button>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>