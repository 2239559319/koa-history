export interface Router {
  path: string;
  children?: Array<Router>;
}

export interface Option {
  routes?: Router | Router[] | string[];
  shield?: boolean;
  root: string;
  opts?: any;
}
