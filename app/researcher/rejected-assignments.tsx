import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { CardClickable } from 'pages/researcher/_components/card-clickable';
import { RenderMeta } from 'pages/researcher/_components/render-meta';
import { callAPI } from 'pages/researcher/_helpers/call-api';
import { assignmentsQuery } from 'pages/researcher/_gql/rejected-assignments.gql';
import { PAGE_SIZE } from 'pages/researcher/_data/shared/constants.data';
import { mapAssignments } from 'pages/researcher/_adapters/mappers/rejected-assignments.map';
import {
  TAssignment,
  TAssignmentsResponse,
} from 'pages/researcher/_types/rejected-assignments.type';
import { useDispatch } from '@util/noval'; //TODO-noval: remove
import { Container } from 'packages/container';
import { Pagination } from 'packages/pagination';

const RejectedAssignments = () => {
  //Start Hooks
  const { t } = useTranslation('common');
  const { push } = useRouter();
  //TODO-noval: fix this error
  //@ts-expect-error ts(2349)
  const { dispatch } = useDispatch();
  const [Assignments, setAssignments] = useState<TAssignment[]>();
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [NumberOfPages, setNumberOfPages] = useState<number>(1);
  //End Hooks

  //Start Data Fetching
  //TODO-noval: stop using the noval dispatch, it has a bad side effect of re-rendering the component
  const activeToken = useCallback(
    () =>
      dispatch('activeToken', {
        callback: () => {
          push('/');
        },
      }),
    [dispatch, push]
  );

  const getData = useCallback(async () => {
    const token = await activeToken();

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
      data?.myRejectedAssignments?.assignments || []
    );

    setAssignments(assignments);
    setNumberOfPages(data?.myRejectedAssignments?.pageInfo?.totalPages);
  }, [activeToken, CurrentPage]);

  useEffect(() => {
    getData();
    //TODO-noval: this warning will stop when stop using the noval dispatch
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentPage]);
  //End Data Fetching

  //Start Lists of rendered components
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
  //End Lists of rendered components

  return (
    //TODO-tsx: This container has to be in the layout instead of the page
    <Container>
      {/* TODO: follow the NextJS v15 meta */}
      <RenderMeta title={t('researcher.rejectedAssignments')} />

      <section className='grid gap-8'>
        <h1 className='capitalize text-lg 2xl:text-2xl font-bold'>
          {t('researcher.rejectedAssignments')}
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

export default RejectedAssignments;
