/// <reference types="@cloudflare/workers-types" />
import { handleRequest } from './handlers/api';

export interface Env {
  DANDAN_APP_ID: string;
  DANDAN_APP_SECRET: string;
}

addEventListener('fetch', ((event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
}) as EventListener);
