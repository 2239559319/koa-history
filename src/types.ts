export interface Router {
  path: string;
  children?: Array<Router>;
}

export interface Option {
  routes?: Router | Router[];
  root: string;
  opts: any;
}
