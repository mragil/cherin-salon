export const ssr = false;

import { pb } from '$lib/pocketbase';
import type { Category } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const roles = pb.authStore.model?.roles;

	if (!pb.authStore.isValid && roles !== 'admin') {
		redirect(307, `/login`);
	}

	const categories = pb.collection('categories').getFullList<Category>({
    sort: '+label'
	});

	return {
		categories
	}
};