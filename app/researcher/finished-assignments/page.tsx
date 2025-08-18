'use client';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { CardClickable } from 'app/researcher/_components/card-clickable';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { useResearcherCtx } from 'app/researcher/_context/researcher-context';
import { callAPI } from 'app/researcher/_helpers/call-api';
import { assignmentsQuery } from 'app/researcher/_gql/finished-assignments.gql';
import { PAGE_SIZE } from 'app/researcher/_data/shared/constants.data';
import { mapAssignments } from 'app/researcher/_adapters/mappers/finished-assignments.map';
import {
  TAssignment,
  TAssignmentsResponse,
} from 'app/researcher/_types/finished-assignments.type';
import { Container } from 'packages/container';
import { Pagination } from 'packages/pagination';

const FinishedAssignments = () => {
  // Start Hooks
  const { t } = useTranslation('common');

  const { State, setState } = useResearcherCtx();

  const [Assignments, setAssignments] = useState<TAssignment[]>();
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [NumberOfPages, setNumberOfPages] = useState<number>(1);
  // End Hooks

  // Start Data Fetching
  const getData = useCallback(async () => {
    const token = '';

    const data: TAssignmentsResponse = await callAPI({
      body: {
        query: assignmentsQuery,

        variables: {
          page: CurrentPage - 1,
          size: PAGE_SIZE,
        },
      },
      token: token,
    });

    const assignments = mapAssignments(
      data?.myFinishedAssignments?.assignments || []
    );

    setAssignments(assignments);
    setNumberOfPages(data?.myFinishedAssignments?.pageInfo?.totalPages);
  }, [CurrentPage]);

  useEffect(() => {
    getData();
  }, [CurrentPage]);
  // End Data Fetching

  // Start Lists of rendered components
  const cardsList = Assignments?.map(
    ({ id, surveyName, numberOfRequiredAnswers }) => {
      return (
        <CardClickable
          key={id}
          href={`/researcher/assignments/${id}/general-info`}
          title={surveyName}
          quantity={numberOfRequiredAnswers}
          trans={t}
        />
      );
    }
  );
  // End Lists of rendered components

  return (
    // TODO-tsx: This container has to be in the layout instead of the page
    <Container>
      {/* TODO: follow the NextJS v15 meta */}
      <RenderMeta title={t('researcher.finishedAssignments')} />

      <button onClick={() => setState(prev => !prev)}>
        {`Hello ${State}`}
      </button>

      <section className='grid gap-8'>
        <h1 className='capitalize text-lg 2xl:text-2xl font-bold'>
          {t('researcher.finishedAssignments')}
        </h1>

        <div className='grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
          {cardsList}
        </div>

        {NumberOfPages > 1 && (
          <div className='place-self-end'>
            <Pagination
              setCurrentPage={setCurrentPage}
              CurrentPage={CurrentPage}
              numberOfPages={NumberOfPages}
            />
          </div>
        )}
      </section>
    </Container>
  );
};

export default FinishedAssignments;
