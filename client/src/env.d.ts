declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
