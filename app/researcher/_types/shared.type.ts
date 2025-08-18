type TTrans = (arg: string) => string;

type TTabsParams = {
  id: string;
  trans: TTrans;
};

export type { TTrans, TTabsParams };
