export const ssr = false;

import { pb } from '$lib/pocketbase';
import type { Order } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  const roles = pb.authStore.model?.roles;

	if (!pb.authStore.isValid && roles !== 'admin') {
		redirect(307, `/login`);
	}

	const selectedDate = url.searchParams.get('transactionDate') || '';
	const filterDate = `created >= '${selectedDate} 00:00:00.000Z' && created <= '${selectedDate} 23:59:59.999Z'`

	const orders = pb.collection('orders').getFullList<Order>({
		filter: (selectedDate !== '') ? filterDate : ''
	});

	return {
		orders
	}
};