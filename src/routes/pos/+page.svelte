<script lang="ts">
	import { PUBLIC_SHOP_NAME } from '$env/static/public';
	import { pb } from '$lib/pocketbase';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';
	import Cart from './(components)/Cart.svelte';
	import CategoryList from './(components)/CategoryList.svelte';
	import ItemList from './(components)/ItemList.svelte';

	import { page } from '$app/stores';
	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { RecordModel } from 'pocketbase';
	import { toast } from 'svelte-sonner';
	import ReceiptDialog from './(components)/ReceiptDialog.svelte';

	let cashier = $page.url.searchParams.get('cashier')!;

	$effect(() => {
		toast.success(`Welcome ${cashier}!`);
	});

	let shopItem: HTMLDivElement;
	let { data } = $props();
	let shouldPrintReceipt = $state(false);
	let savedOrder = $state<RecordModel | null>(null);
	const shop = new ShopData(PUBLIC_SHOP_NAME, cashier);
	const printer = new ReceiptPrinter();

	async function saveOrder() {
		toast.promise(pb.collection('orders').create(shop.getMappedData()), {
			loading: 'Saving Order...',
			success: (data) => {
				shouldPrintReceipt = true;
				savedOrder = data;
				return 'Success saving your order!';
			},
			error: 'Failed to save order, Please try again 🙏'
		});
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
			setTimeout(() => {
				shop.reset();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}, 1000);
		}
	}
</script>

<div class="flex flex-col justify-center gap-4 md:flex-row">
	<!-- Shop -->
	<div class="flex flex-col gap-5 rounded-lg bg-[#f2f3f4] p-5 md:w-4/6">
		<div>
			{#await data.categories}
				<br />
			{:then categories}
				<CategoryList {categories} />
			{/await}
		</div>
		<div class="overflow-y-scroll" bind:this={shopItem}>
			{#await data.items}
				<p class="text-center text-2xl font-bold">Loading...</p>
			{:then items}
				<ItemList {items} onPress={(data: Item) => shop.addToCart(data)} />
			{/await}
		</div>
	</div>
	<!-- End Shop -->

	<!-- Cart -->
	<div class="overflow-y-scroll scrollbar-hide md:w-2/6">
		<Cart {shop} onSubmit={saveOrder} />
	</div>
	<!-- End Cart -->
</div>

<ReceiptDialog {onClosePrint} {savedOrder} {printReceipt} {shop} bind:shouldPrintReceipt />
