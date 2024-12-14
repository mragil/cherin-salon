<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { pb } from '$lib/pocketbase';
	import type { Item } from '$lib/types';

	let { item }: { item: Item } = $props();
	let editedItem = $state({
		name: item.name,
		price: item.price
	});

	const handleSubmit = async () => {
		await pb.collection('items').update(item.id, editedItem);
		invalidateAll();
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Item</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Item</Dialog.Title>
			<Dialog.Description>
				Make changes to item here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={editedItem.name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-right">Price</Label>
				<Input id="price" inputmode={'numeric'} bind:value={editedItem.price} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button
				class="bg-primary"
				onclick={handleSubmit}
				disabled={editedItem.name === '' || editedItem.price <= 0}
				>Save changes</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
