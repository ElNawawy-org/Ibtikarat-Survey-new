type TParam = { name: string; type: string };

type TOptions = {
  root: string;
  fields: string;

  params?: TParam[];
  includePageInfo?: boolean;
};

type TBuildQuery = (options: TOptions) => string;

export type { TBuildQuery };
