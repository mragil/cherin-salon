<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';

	let { children } = $props();

	let cashier = $page.url.searchParams.get('cashier')!;

	$effect(() => {
		if (!pb.authStore.isValid) {
			goto(`/login`);
		}

		if (!cashier || cashier === '') {
			goto('/cashier');
		}
	});
</script>

<div class="p-1">
	{@render children()}
</div>
