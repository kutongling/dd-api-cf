interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

declare global {
  const DANDAN_APP_ID: string;
  const DANDAN_APP_SECRET: string;

  function addEventListener(
    type: 'fetch',
    handler: (event: FetchEvent) => void
  ): void;
}

export {};
