<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { toast } from 'svelte-sonner';

	import UserAuthForm from './(components)/user-auth-from.svelte';

	const login = async (identity: string, password: string) => (callback: VoidFunction) => {
		toast.promise(pb.collection('users').authWithPassword(identity, password), {
			loading: 'Please wait while we authenticate you...',
			success: (data) => {
				if (data.record.roles === 'admin') {
					callback();
					goto('/admin');
					return 'Welcome Admin';
				}
				callback();
				goto(`/cashier`);
				return 'Welcome, Please enter your name';
			},
			error: () => {
				callback();
				return 'Wrong username/email or password!';
			}
		});
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-3/6">
		<div class="mb-5 flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Cherin Salon</h1>
			<p class="text-sm text-muted-foreground">
				Enter your email or username and password to login
			</p>
		</div>
		<UserAuthForm loginAction={login} />
	</div>
</div>
