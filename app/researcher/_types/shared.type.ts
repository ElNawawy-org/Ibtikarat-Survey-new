type TTrans = (arg: string) => string;

type TTabsParams = {
  id: string;
  trans: TTrans;
};

export type { TTrans, TTabsParams };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
