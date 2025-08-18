'use client';
// TODO-fix: this page has a build error
/* 
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { CardClickable2 } from 'app/researcher/_components/card-clickable-2';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { callAPI } from 'app/researcher/_helpers/call-api';
import { researcherQuery } from 'app/researcher/_gql/index.gql';
import { CARDS, COLUMNS } from 'app/researcher/_data/index.data';
import { mapAssignments } from 'app/researcher/_adapters/mappers/index.map';
import {
  TAssignment,
  TAssignmentsResponse,
  TDashboard,
} from 'app/researcher/_types/index.type';
import { Container } from 'packages/container';
import { ProgressCircular } from 'packages/progress-circular';
import { ShowDetails } from 'packages/show-details';
import { SimpleTable } from 'packages/simple-table';

const assignmentsInit: TAssignment[] = [];
const dashboardInit: TDashboard = {
  newOrders: '',
  inprogress: '',
  accomplished: '',
  rejected: '',
};
 */

const Researcher = () => {
  /* 
  // Start Hooks
  const { t } = useTranslation('common');
  useRouter();

  const [Assignments, setAssignments] =
    useState<TAssignment[]>(assignmentsInit);
  const [Dashboard, setDashboard] = useState<TDashboard>(dashboardInit);
  // End Hooks

  // Start Data Fetching
  const getData = useCallback(async () => {
    const token = '';

    const data: TAssignmentsResponse = await callAPI({
      body: {
        query: researcherQuery,
      },
      token: token,
    });

    const assignments = mapAssignments(
      data?.researcherDashboard?.assignments || []
    );

    setAssignments(assignments);
    setDashboard(data?.researcherDashboard?.orderStatics);
  }, []);

  useEffect(() => {
    getData();
  }, []);
  // End Data Fetching

  // Start Lists of rendered components
  const cardsList = CARDS({ data: Dashboard, trans: t }).map(
    ({ id, href, value, label, icon }) => (
      <CardClickable2
        key={id}
        label={label}
        value={value}
        icon={icon}
        href={href}
      />
    )
  );

  const rows = Assignments?.map(
    ({ id, numberOfRequiredAnswers, numberOfResponses, surveyName }) => ({
      id,
      order: (
        <Link href={`/researcher/assignments/${id}/general-info`}>
          {surveyName}
        </Link>
      ),
      progress: (
        <ProgressCircular
          percentage={
            numberOfResponses
              ? parseFloat(
                  ((numberOfResponses / numberOfRequiredAnswers) * 100).toFixed(
                    2
                  )
                )
              : 0
          }
        />
      ),
      options: (
        <ShowDetails
          href={`/researcher/assignments/${id}/general-info`}
          title={t('supervisor.tables.details')}
        />
      ),
    })
  );
  // End Lists of rendered components
  */

  return <div>Researcher</div>;

  // return (
  //   // TODO-tsx: This container has to be in the layout instead of the page
  //   <Container>
  //     {/* TODO: follow the NextJS v15 meta */}
  //     <RenderMeta title={t('researcher.assignments')} />
  //     <section className='grid gap-8'>
  //       <h1 className='capitalize text-lg 2xl:text-2xl font-bold'>
  //         {t('toolbar.dashboard')}
  //       </h1>
  //       <div className='grid gap-4 p-4 border border-grey-400'>
  //         <h2>{t('researcher.assignments')}</h2>
  //         <ul className='list-none overflow-x-auto grid gap-1 md:gap-6 md:grid-cols-2 xl:grid-cols-4'>
  //           {cardsList}
  //         </ul>
  //       </div>
  //       <SimpleTable
  //         header={t('researcher.latestAssignments')}
  //         columns={COLUMNS(t)}
  //         rows={rows}
  //       />
  //     </section>
  //   </Container>
  // );
};

export default Researcher;
