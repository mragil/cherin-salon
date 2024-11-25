import { pb } from '$lib/pocketbase';
import type { Category, Item } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const selectedCategory = url.searchParams.get('category') || 'all';
	const categories = pb.collection('categories').getFullList<Category>({
    sort: '+label'
	});
	const items = pb.collection('items').getFullList<Item>({
		sort: '-name',
		filter: (selectedCategory !== 'all') ? `category.value = '${selectedCategory}'`: ''
	})

	return {
		categories,
		items
	}
};