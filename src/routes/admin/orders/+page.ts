export const ssr = false;

import { pb } from '$lib/pocketbase';
import type { Order } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const roles = pb.authStore.model?.roles;

	if (!pb.authStore.isValid && roles !== 'admin') {
		redirect(307, `/login`);
	}

	const orders = pb.collection('orders').getFullList<Order>();

	return {
		orders
	}
};