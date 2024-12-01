<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let cashier = $state('');
	let buttonDisabled = $derived(!cashier);
	$inspect(buttonDisabled);

	const navigateToCashier = (e: SubmitEvent) => {
		e.preventDefault();
		goto(`/pos?cashier=${cashier}`);
	};
</script>

<form class="mx-auto p-6 text-center" onsubmit={navigateToCashier}>
	<Input class="mb-10" bind:value={cashier} />
	<Button disabled={buttonDisabled} type={"submit"}>Enter as Cashier</Button>
</form>
