<script lang="ts">
	import UserAuthForm from './(components)/user-auth-from.svelte';
</script>

<div class="h-screen flex items-center justify-center">
	<div class="w-3/6">
		<div class="mb-5 flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Cherin Salon</h1>
			<p class="text-sm text-muted-foreground">
				Enter your email or username and password to login
			</p>
		</div>
		<UserAuthForm />
	</div>
</div>
