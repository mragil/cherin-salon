<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { toast } from 'svelte-sonner';

	import * as Alert from '$lib/components/ui/alert/index.js';
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
			<h1 class="text-2xl font-semibold tracking-tight">Demo Shop</h1>
			<p class="text-sm text-muted-foreground">
				Enter your email or username and password to login
			</p>
		</div>
		<UserAuthForm loginAction={login} />
		<div class="mt-5">
			<Alert.Root>
				<Alert.Title>Heads up!</Alert.Title>
				<Alert.Description>
					You can use these credential to checkout the apps.
					<br />Email: demo_admin@mrtrr.id - Password: demo_admin --> for admin access
					<br />Email: demo_cashier@mrtrr.id - Password: demo_cashier --> for cashier access
				</Alert.Description>
			</Alert.Root>
		</div>
	</div>
</div>
