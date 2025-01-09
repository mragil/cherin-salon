<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	pb.authStore.clear();
	goto('/login');
</script>

<h1>Logout...</h1>
