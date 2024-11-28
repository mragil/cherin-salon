<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import Printer from 'lucide-svelte/icons/printer';
	import Cart from 'lucide-svelte/icons/shopping-cart';
	import Trash from 'lucide-svelte/icons/trash';

	import { DEFAULT_DISCOUNTS } from '$lib/constants';
	import type { CartProps } from '$lib/types';
	import { currency, format, formatRupiah } from '$lib/utils';
	import DiscountList from './DiscountList.svelte';

	let { shop, onSubmit }: CartProps = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Cart</Card.Title>
	</Card.Header>
	<Separator class="mt-5" />
	<Card.Content class="flex flex-col gap-5">
		{#if shop.itemsArr.length === 0}
			<div class="flex flex-col items-center justify-center gap-2">
				<Cart class="h-28 w-28" />
				<h1 class="font-bold">Empty Cart</h1>
			</div>
		{:else}
			{#each shop.itemsArr as item}
				<div class="flex items-center justify-between text-sm">
					<div>
						<div>
							<p class="flex basis-full">{item.name}</p>
						</div>
						<div class="flex basis-full">
							<p>{formatRupiah(item.price)}</p>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<Plus class="pressed w-4" onclick={() => shop.increaseQty(item.id)} />
						<Input
							type="number"
							class="w-10 text-center lg:w-12"
							bind:value={item.quantity}
							min={1}
						/>
						{#if item.quantity === 1}
							<Trash class="pressed w-4" onclick={() => shop.decreaseQty(item.id)} />
						{:else}
							<Minus class="pressed w-4" onclick={() => shop.decreaseQty(item.id)} />
						{/if}
					</div>
				</div>
				<Separator />
			{/each}
		{/if}
	</Card.Content>
	{#if shop.itemsArr.length > 0}
		<Card.Footer class="flex flex-wrap gap-4 text-sm font-bold">
			<div class="flex items-center justify-center">
				<p class="">Total:</p>
				<p class="">{formatRupiah(shop.total)}</p>
			</div>
			<DiscountList
				discounts={DEFAULT_DISCOUNTS}
				selected={shop.discount}
				onSelected={(selected: number) => shop.setDiscount(selected)}
			/>
			<div class="flex items-center justify-center">
				<p class="">Grand Total:&nbsp;</p>
				<p class="">{formatRupiah(shop.totalAfterDisc)}</p>
			</div>
			<div class="flex items-center justify-center">
				{#if shop.paymentDisplay === ''}
					<p>Rp&nbsp;</p>
				{/if}
				<input
					type="text"
					inputmode="numeric"
					class="w-full border-b-2 border-primary focus:outline-none focus:ring-0"
					use:format={currency}
					bind:value={shop.paymentDisplay}
					maxlength="16"
				/>
			</div>
			{#if shop.payment >= shop.totalAfterDisc}
				<div class="flex items-center justify-center">
					<p class="">Changes:&nbsp;</p>
					<p class="">{formatRupiah(shop.payment - shop.totalAfterDisc)}</p>
				</div>
				<Printer class="pressed m-5 mx-auto h-11 w-11" onclick={onSubmit} />
			{/if}
		</Card.Footer>
	{/if}
</Card.Root>
