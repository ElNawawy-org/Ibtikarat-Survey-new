import { JSX } from 'react';

type TProps = {
  href: string;
  label: string;
  value: string | number;

  icon?: () => JSX.Element;
};

export type { TProps };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
