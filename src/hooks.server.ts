import { createInstance } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.pb = createInstance();

  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
  } catch (_) {  // eslint-disable-line @typescript-eslint/no-unused-vars
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

  return response;
}

export const handle = sequence(authentication)
