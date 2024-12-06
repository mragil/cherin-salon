<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children } = $props();

	const cashier = $page.url.searchParams.get('cashier')!;

	onMount(() => {
		if (!cashier || cashier === '') {
			goto('/cashier');
		}
	});
</script>

<div class="p-5">
	{@render children()}
</div>
