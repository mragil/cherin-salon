<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import Printer from 'lucide-svelte/icons/printer';

	import { DEFAULT_DISCOUNTS } from '$lib/constants';
	import type { CartProps } from '$lib/types';
	import { currency, format, formatRupiah } from '$lib/utils';
	import DiscountList from './DiscountList.svelte';

	let { items, increaseQty, decreaseQty }: CartProps = $props();

	let currentItems = $state(items);
	let currentItemsArr = $derived(Object.values(currentItems));
	let paymentDisplay = $state<string>('');
	let payment = $derived(Number(paymentDisplay.substring(3).replaceAll('.', '')));
	$inspect(payment);
	let discount = $state(0);
	let total = $derived(
		currentItemsArr.reduce((total, item) => (total = total + item.price * item.quantity), 0)
	);
	const totalAfterDisc = $derived(total - total * (discount / 100));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Cart</Card.Title>
		<Card.Description>Order #123</Card.Description>
	</Card.Header>
	<Separator class="mt-5" />
	<Card.Content class="flex flex-col gap-5">
		{#if currentItemsArr.length === 0}
			Empty Cart
		{:else}
			{#each currentItemsArr as item}
				<div class="flex flex-col items-center gap-5">
					<div>
						<p>{item.name}</p>
						<p>{formatRupiah(item.price)}</p>
					</div>
					<div class="flex items-center gap-2">
						<Plus class="pressed" onclick={() => increaseQty(item.id)} />
						<Input
							type="number"
							class="w-10 text-center lg:w-12"
							bind:value={item.quantity}
							min={1}
						/>
						<Minus class="pressed" onclick={() => decreaseQty(item.id)} />
					</div>
				</div>
				<Separator />
			{/each}
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-wrap gap-4 text-sm font-bold">
		<div class="flex items-center justify-center">
			<p class="">Total:</p>
			<p class="">{formatRupiah(total)}</p>
		</div>
		<DiscountList
			discounts={DEFAULT_DISCOUNTS}
			onSelected={(selected: number) => (discount = selected)}
		/>
		<div class="flex items-center justify-center">
			<p class="">Grand Total:&nbsp;</p>
			<p class="">{formatRupiah(totalAfterDisc)}</p>
		</div>
		<div class="flex items-center justify-center">
			{#if paymentDisplay === ''}
				<p>Rp&nbsp;</p>
			{/if}
			<input
				type="text"
				inputmode="numeric"
				class="w-full border-b-2 border-primary focus:outline-none focus:ring-0"
				use:format={currency}
				bind:value={paymentDisplay}
				maxlength="16"
			/>
		</div>
		{#if payment >= totalAfterDisc}
			<div class="flex items-center justify-center">
				<p class="">Changes:&nbsp;</p>
				<p class="">{formatRupiah(payment - totalAfterDisc)}</p>
			</div>
		{/if}
	</Card.Footer>
	<Separator />
	<Printer class="pressed m-5 mx-auto h-11 w-11" />
</Card.Root>
