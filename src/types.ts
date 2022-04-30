export interface Router {
  path: string;
  children?: Array<Router>;
}

export interface Option {
  routes?: Router | Router[] | string[];
  root: string;
  opts?: any;
}
