<script lang="ts">
	import { PUBLIC_SHOP_NAME } from '$env/static/public';
	import { pb } from '$lib/pocketbase';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';
	import Cart from './(components)/Cart.svelte';
	import CategoryList from './(components)/CategoryList.svelte';
	import ItemList from './(components)/ItemList.svelte';

	import { page } from '$app/stores';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { RecordModel } from 'pocketbase';
	import { toast } from 'svelte-sonner';
	import ReceiptDialog from './(components)/ReceiptDialog.svelte';

	const cashier = $page.url.searchParams.get('cashier')!;

	$effect(() => {
		toast.success(`Welcome ${cashier}!`);
	});

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
			requestAnimationFrame(() => {
				window.scrollTo({ top: 0, behavior: 'instant' });
			});
			shop.reset();
		}
	}
</script>

<div class="flex flex-col justify-center gap-4 p-4 md:flex-row">
	<!-- Shop -->
	<div class="flex h-[47rem] flex-col gap-5 rounded-lg bg-secondary p-5 md:w-4/6">
		{#await data.categories}
			<div class="flex gap-4">
				<Skeleton class="h-4 w-[40px] bg-primary" />
				<Skeleton class="h-4 w-[40px] bg-primary" />
				<Skeleton class="h-4 w-[40px] bg-primary" />
				<Skeleton class="h-4 w-[40px] bg-primary" />
			</div>
		{:then categories}
			<CategoryList {categories} />
		{/await}
		<div class="overflow-y-scroll scrollbar-hide">
			{#await data.items}
				<div class="flex gap-4">
					<Skeleton class="h-20 w-36 bg-primary" />
					<Skeleton class="h-20 w-36 bg-primary" />
					<Skeleton class="h-20 w-36 bg-primary" />
				</div>
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
