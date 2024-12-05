<script lang="ts">
	import { PUBLIC_SHOP_NAME } from '$env/static/public';
	import Cart from './(components)/Cart.svelte';
	import CategoryList from './(components)/CategoryList.svelte';
	import ItemList from './(components)/ItemList.svelte';
	import { pb } from '$lib/pocketbase';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ReceiptDialog from './(components)/ReceiptDialog.svelte';
	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	const cashier = $page.url.searchParams.get('cashier')!;

	onMount(() => {
		if (!cashier || cashier === '') {
			alert('Please enter your name first!');
			goto('/');
		}
	});

	let { data }: { data: PageData } = $props();
	let shouldPrintReceipt = $state(false);
	let savedOrder = $state<RecordModel | null>(null);
	const shop = new ShopData(PUBLIC_SHOP_NAME, cashier);
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
		if (savedOrder) {
			printer.printData({
				...shop.getMappedData(),
				id: savedOrder.id,
				transactionDate: savedOrder.created
			});
		}
	}

	function onClosePrint(open: boolean) {
		if (!open) {
			shop.reset();
			requestAnimationFrame(() => {
				window.scrollTo({ top: 0, behavior: 'instant' });
			});
		}
	}
</script>

<div class="flex flex-col justify-center gap-4 p-4 md:flex-row">
	<!-- Shop -->
	<div class="flex h-[47rem] flex-col gap-5 rounded-lg bg-secondary p-5 md:w-4/6">
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
	<div class="h-[47rem] overflow-y-scroll scrollbar-hide md:w-2/6">
		<Cart {shop} onSubmit={saveOrder} />
	</div>
	<!-- End Cart -->
</div>

<ReceiptDialog {onClosePrint} {savedOrder} {printReceipt} {shop} bind:shouldPrintReceipt />
