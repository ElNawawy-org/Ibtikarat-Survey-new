type TProps = {
  href: string;
  title: string;
  quantity: number;
  trans: (arg: string) => string;
};

export type { TProps };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
