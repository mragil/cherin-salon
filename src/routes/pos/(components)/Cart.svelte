<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import Printer from 'lucide-svelte/icons/printer';
	import Cart from 'lucide-svelte/icons/shopping-cart';
	import Trash from 'lucide-svelte/icons/trash';

	import { goto } from '$app/navigation';
	import { DEFAULT_DISCOUNTS } from '$lib/constants';
	import type { CartProps } from '$lib/types';
	import { currency, format, formatRupiah } from '$lib/utils';
	import DiscountDropdown from './DiscountDropdown.svelte';

	let { shop, onSubmit }: CartProps = $props();

	const navigateToHome = () => {
		goto(`/`);
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{shop.name}</Card.Title>
		<Card.CardDescription class="font-semibold">Cashier: {shop.cashier}</Card.CardDescription>
		<Button onclick={navigateToHome}>Change Cashier</Button>
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
				<div class="flex items-center justify-between text-sm">
					<p>Discount:</p>
					<DiscountDropdown
						discounts={DEFAULT_DISCOUNTS}
						discount={shop.items[item.id].discount}
						onSelected={(selected: number) => shop.setItemDiscount(item.id, selected)}
					/>
				</div>
				<div class="flex items-center justify-between text-sm">
					<div>
						<p>Total Price:</p>
					</div>
					<div>
						<p>{formatRupiah(item.totalPrice)}</p>
					</div>
				</div>
				<Separator />
			{/each}
		{/if}
	</Card.Content>
	{#if shop.itemsArr.length > 0}
		<Card.Footer class="flex flex-col items-start gap-4 text-sm font-bold">
			<div class="flex w-full items-center justify-between">
				<p class="">Total:</p>
				<p class="">{formatRupiah(shop.total)}</p>
			</div>
			<div class="flex w-full items-center justify-between">
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
			{#if shop.payment >= shop.total}
				<div class="flex items-center justify-center">
					<p class="">Changes:&nbsp;</p>
					<p class="">{formatRupiah(shop.payment - shop.total)}</p>
				</div>
				<Printer class="pressed m-5 mx-auto h-11 w-11" onclick={onSubmit} />
			{/if}
		</Card.Footer>
	{/if}
</Card.Root>
