import { z } from "zod";

export const itemSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	updated: z.date(),
	image: z.string().nullable()
});

export const categoriesSchema = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
	updated: z.date()
});

export const itemsResponse = z.object({
	items: z.array(itemSchema)
});

export const categoriesResponse = z.object({
	categories: z.array(categoriesSchema)
})

