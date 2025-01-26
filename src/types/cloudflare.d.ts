export {};

declare global {
  // 定义 FetchEvent 接口
  interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Response | Promise<Response>): void;
  }

  // 声明全局变量
  const DANDAN_APP_ID: string;
  const DANDAN_APP_SECRET: string;
}
