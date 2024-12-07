<script lang="ts">
	import screenfull from 'screenfull';

	const requestFullscreen = () => {
		if (screenfull.isEnabled) {
			screenfull.request();
		}
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="">
		<a class="font-bold" href="/login" onclick={requestFullscreen}>Click Here</a>
	</div>
</div>
