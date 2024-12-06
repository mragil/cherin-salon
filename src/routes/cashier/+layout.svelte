<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let { children } = $props();

	$effect(() => {
		if (!pb.authStore.isValid) {
			goto(`/login`);
		}
	});
</script>

{@render children()}
