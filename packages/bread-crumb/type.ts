type TLink = {
  title: string;
  href?: string;
};

type TProps = {
  links: TLink[];
  dataTest?: string;
  lang?: 'ar' | 'en';
};

export type { TProps };
