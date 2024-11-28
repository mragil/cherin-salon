<script lang="ts">
	import Cart from '$lib/components/pages/pos/Cart.svelte';
	import CategoryList from '$lib/components/pages/pos/CategoryList.svelte';
	import ItemList from '$lib/components/pages/pos/ItemList.svelte';
	import { pb } from '$lib/pocketbase';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';

	import ReceiptPrinter from '$lib/ReceiptPrinter';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const shop = new ShopData();
	const printer = new ReceiptPrinter();

	async function saveAndOrder() {
		try {
			const order = {
				items: shop.itemsArr,
				total: shop.total,
				totalAfterDiscount: shop.totalAfterDisc,
				payment: shop.payment,
				discount: shop.discount,
				cashier: 'Kasir'
			};
			const savedOrder = await pb.collection('orders').create(order);
			printer.printData({...order, id: savedOrder.id, transactionDate: savedOrder.created});
			shop.reset();
		} catch (error) {
			alert('Error!!!');
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
		<Cart {shop} onSubmit={saveAndOrder} />
	</div>
	<!-- End Cart -->
</div>
