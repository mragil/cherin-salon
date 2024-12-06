export const ssr = false;

import { pb } from '$lib/pocketbase';
import type { ExpandedItem } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const roles = pb.authStore.model?.roles;

	if (!pb.authStore.isValid && roles !== 'admin') {
		redirect(307, `/login`);
	}

	const items = pb.collection('items').getFullList<ExpandedItem>({
		sort: '-name',
		expand: 'category'
	});

	return {
		items
	}
};