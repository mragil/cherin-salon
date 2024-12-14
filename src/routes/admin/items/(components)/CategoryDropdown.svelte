<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { Category, DiscountDropdownProps } from '$lib/types';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';

	let { categories, onSelected }: { categories: Category[], onSelected: (selected: Category) => void } = $props();
	let open = $state(false);
	let selected = $state(categories[0]);
	let triggerRef = $state<HTMLButtonElement>(null!);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selected.label}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="p-0">
		<Command.Root>
			<Command.List>
				<Command.Group>
					{#each categories as category}
						<Command.Item
							class={selected.value === category.value ? 'bg-primary' : ''}
							value={category.label}
							onSelect={() => {
								selected = category;
								onSelected(selected);
								closeAndFocusTrigger();
							}}
						>
							{category.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
