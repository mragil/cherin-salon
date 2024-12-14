<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { pb } from '$lib/pocketbase';
	import type { Category } from '$lib/types';
	import CategoryDropdown from './CategoryDropdown.svelte';

	let { categories }: { categories: Category[] } = $props();

	let newItem = $state({
		name: '',
		price: 0,
		category: ''
	});

	const handleSubmit = async () => {
		await pb.collection('items').create(newItem);

		invalidateAll();
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Item</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Item</Dialog.Title>
			<Dialog.Description>Create new item here. Click save when you're done.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={newItem.name} autocomplete="off" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-right">Price</Label>
				<Input id="price" inputmode={'numeric'} bind:value={newItem.price} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="category" class="text-right">Category</Label>
				<CategoryDropdown
					{categories}
					onSelected={(selected) => (newItem.category = selected.id)}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button
				class="bg-primary"
				onclick={handleSubmit}
				disabled={newItem.name === '' || newItem.price <= 0}>Save changes</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
