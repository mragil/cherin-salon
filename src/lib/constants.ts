import { PUBLIC_DISCOUNTS } from '$env/static/public';

export const DEFAULT_DISCOUNTS = PUBLIC_DISCOUNTS.split(',').map((val) => Number(val));
