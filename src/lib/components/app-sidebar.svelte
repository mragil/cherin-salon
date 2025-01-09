<script lang="ts" module>
	// sample data
	const data = {
		navMain: [
			{
				title: 'Dashboard',
				url: '/admin',
				items: []
			},
			{
				title: 'Shop Item',
				url: '#',
				items: [
					{
						title: 'Category',
						url: '/admin/category'
					},
					{
						title: 'Item',
						url: '/admin/items'
					}
				]
			},
			{
				title: 'Order',
				url: '#',
				items: [
					{
						title: 'All Order',
						url: '/admin/orders'
					}
				]
			},
			{
				items: [
					{
						title: 'Logout',
						url: '/logout'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>Cherin Salon</Sidebar.Header>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
									{#snippet child({ props })}
										<a href={item.url} {...props}>{item.title}</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
