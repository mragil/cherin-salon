<script lang="ts">
	import Cart from '$lib/components/pages/pos/Cart.svelte';
	import CategoryList from '$lib/components/pages/pos/CategoryList.svelte';
	import ItemList from '$lib/components/pages/pos/ItemList.svelte';
	import ShopData from '$lib/Shop.svelte';
	import type { Item } from '$lib/types';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const shop = new ShopData();

	const cartProps = {
		increaseQty: (id: string) => shop.increaseQty(id),
		decreaseQty: (id: string) => {shop.decreaseQty(id)},
		items: shop.items!
	};
</script>

<div class="flex flex-row justify-center gap-4 p-4">
	<!-- Shop -->
	<div class="flex h-[47rem] w-4/6 flex-col gap-5 rounded-lg bg-secondary p-5">
		{#await data.categories}
			Loading categories...
		{:then categories}
			<CategoryList {categories} />
		{/await}
		<div class="scrollbar-hide overflow-y-scroll">
			{#await data.items}
				Loading items...
			{:then items}
				<ItemList {items} onPress={(data: Item) => shop.addToCart(data) }/>
			{/await}
		</div>
	</div>
	<!-- End Shop -->

	<!-- Cart -->
	<div class="scrollbar-hide w-2/6 h-[47rem] overflow-y-scroll">
		<Cart {...cartProps} />
	</div>
	<!-- End Cart -->
</div>
