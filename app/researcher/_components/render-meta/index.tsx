// TODO-meta: -elnawawy- Convert the current approach to the new Nextjs metaData approach

import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

// TODO-Typescript: set this function's type
export const RenderMeta = ({ title }: { title: string }) => {
  const { t } = useTranslation('common');

  const finalTitle = title
    ? `${t('toolbar.upsilon')} - ${title}`
    : t('toolbar.upsilon');

  return (
    <Head>
      <title>{finalTitle}</title>

      <meta
        property='og:title'
        content={finalTitle}
      />

      <meta
        property='og:image:alt'
        content={t('toolbar.upsilon')}
      />

      <meta
        name='twitter:card'
        content='summary_large_image'
      />

      <meta
        name='twitter:site'
        content='@upsilon'
      />

      <meta
        name='twitter:title'
        content={finalTitle}
      />
    </Head>
  );
};
