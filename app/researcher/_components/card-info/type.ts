import { JSX } from 'react';

type TProps = {
  label: string;
  value: string | number;

  icon?: () => JSX.Element;

  desc?: string;
  shadow?: boolean;
};

export type { TProps };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
