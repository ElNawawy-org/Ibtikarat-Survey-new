type TParam = { name: string; type: string };

type TOptions = {
  root: string;
  fields: string;

  params?: TParam[];
  includePageInfo?: boolean;
};

type TBuildQuery = (options: TOptions) => string;

export type { TBuildQuery };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
