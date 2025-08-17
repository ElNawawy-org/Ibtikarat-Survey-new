type TRecord = {
  name: string;
  numberOfAnswers: number;
};

type TProps = {
  data: TRecord[];
  firstTitle?: string;
  secondTitle?: string;
};

export type { TProps, TRecord };
