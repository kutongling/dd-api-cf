/// <reference types="@cloudflare/workers-types" />
import { handleRequest } from './handlers/api';

export interface Env {
  DANDAN_APP_ID: string;
  DANDAN_APP_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  }
};
