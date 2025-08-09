declare module 'midtrans-client' {
  export class Snap {
    constructor(options: {
      isProduction?: boolean;
      serverKey?: string;
      clientKey?: string;
    });
    apiConfig: { apiBaseUrl: string };
    createTransactionToken(params: unknown): Promise<string>;
  }
}
