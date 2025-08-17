import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { AssignmentSidebar } from 'app/researcher/_components/assignment-sidebar';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { callAPI } from 'app/researcher/_helpers/call-api';
import {
  assignmentQuery,
  draftAnswersQuery,
} from 'app/researcher/_gql/assignments/[id]/draft-answers.gql';
import { layoutAssignmentQuery } from 'app/researcher/_gql/assignments/[id]/general-info.gql';
import { COLUMNS } from 'app/researcher/_data/assignments/[id]/draft-answers.data';
import { TABS } from 'app/researcher/_data/shared/index.data';
import { mapAssignment } from 'app/researcher/_adapters/mappers/assignments/[id]/draft-answers.map';
import { mapLayoutAssignment } from 'app/researcher/_adapters/mappers/assignments/[id]/general-info.map';
import {
  TAssignment,
  TAssignmentResponse,
  TDraftAnswer,
  TDraftAnswerResponse,
} from 'app/researcher/_types/assignments/[id]/draft-answers.type';
import {
  TLayoutAssignment,
  TLayoutAssignmentResponse,
} from 'app/researcher/_types/assignments/[id]/general-info.type';
import { useDispatch } from '@util/noval';
import { BreadCrumb } from 'packages/bread-crumb';
import { Container } from 'packages/container';
import { SidebarToggleLayout } from 'packages/sidebar-toggle-layout';
import { SimpleTable } from 'packages/simple-table';
import { Tabs } from 'packages/tabs';

const layoutAssignmentInit: TLayoutAssignment = {
  surveyJson: '',
  startDate: '',
  endDate: '',
  surveyId: '',
  surveyStatus: '',
  surveyType: '',
  surveyScaleId: '',
  surveyUrl: '',
  price: 0,
  numberOfRequiredAnswers: 0,
  assignmentId: '',
  assignmentStatus: '',
  rejectRequestNotes: null,
  responsesIsComplete: false,
};

const assignmentInit: TAssignment = {
  surveyName: '',
};

const draftAnswersInit: TDraftAnswer[] = [];

const DraftAnswers = () => {
  //Start Hooks
  const { t, lang } = useTranslation('common');
  const { push, query } = useRouter();
  //TODO-noval: fix this error
  //@ts-expect-error ts(2349)
  const { dispatch } = useDispatch();
  const [LayoutAssignment, setLayoutAssignment] =
    useState<TLayoutAssignment>(layoutAssignmentInit);
  const [Assignment, setAssignment] = useState<TAssignment>(assignmentInit);
  const [DraftAnswers, setDraftAnswers] =
    useState<TDraftAnswer[]>(draftAnswersInit);
  //End Hooks

  //Start Variables
  const {
    assignmentId,
    assignmentStatus,
    price,
    numberOfRequiredAnswers,
    rejectRequestNotes,
    responsesIsComplete,
    surveyId,
    surveyScaleId,
    surveyJson,
    surveyStatus,
    surveyType,
    surveyUrl,
    startDate,
    endDate,
  } = LayoutAssignment;
  //End Variables

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

    const layoutAssignment: { assignmentByOrder: TLayoutAssignmentResponse } =
      await callAPI({
        body: {
          query: layoutAssignmentQuery,
          variables: {
            orderId: query.id,
          },
        },
        token: token,
      });

    setLayoutAssignment(
      mapLayoutAssignment(layoutAssignment?.assignmentByOrder || {})
    );

    //===============================
    //===============================
    //===============================

    const assignment: { assignmentByOrder: TAssignmentResponse } =
      await callAPI({
        body: {
          query: assignmentQuery,
          variables: {
            orderId: query.id,
          },
        },
        token: token,
      });

    setAssignment(
      mapAssignment(assignment?.assignmentByOrder || { order: { survey: {} } })
    );
  }, [activeToken, query.id]);

  useEffect(() => {
    getData();
    //TODO-noval: this warning will stop when stop using the noval dispatch
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDraftAnswers = useCallback(async () => {
    const token = await activeToken();

    const draftAnswers: { draftResponses: TDraftAnswerResponse[] } =
      await callAPI({
        body: {
          query: draftAnswersQuery,
          variables: {
            assignmentId,
          },
        },
        token: token,
      });

    setDraftAnswers(draftAnswers?.draftResponses || []);
  }, [activeToken, assignmentId]);

  useEffect(() => {
    if (assignmentId) getDraftAnswers();
    //TODO-noval: this warning will stop when stop using the noval dispatch
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);
  //End Data Fetching

  //Start Lists of rendered components
  const toggleSideChildren = (
    <AssignmentSidebar
      assignmentId={assignmentId}
      assignmentStatus={assignmentStatus}
      price={price}
      numberOfRequiredAnswers={numberOfRequiredAnswers}
      rejectRequestNotes={rejectRequestNotes}
      responsesIsComplete={responsesIsComplete}
      surveyId={surveyId}
      surveyScaleId={surveyScaleId}
      surveyJson={surveyJson}
      surveyStatus={surveyStatus}
      surveyType={surveyType}
      surveyUrl={surveyUrl}
      startDate={startDate}
      endDate={endDate}
    />
  );

  const rows = DraftAnswers.map(({ id, responseJson }) => ({
    id: id,
    responseJson: responseJson,
    options: (
      <Link href={`/${lang}/survey/DIRECT/draft/${surveyUrl}/${assignmentId}`}>
        {t('supervisor.tables.openInitResponse')}
      </Link>
    ),
  }));
  //End Lists of rendered components

  return (
    //TODO-tsx: This container has to be in the layout instead of the page
    <Container>
      {/* TODO: follow the NextJS v15 meta */}
      <RenderMeta title={t('researcher.assignments')} />

      <SidebarToggleLayout toggleSideChildren={toggleSideChildren}>
        <BreadCrumb
          dataTest='survey-name'
          lang={lang as 'ar' | 'en'}
          links={[
            { title: t('titles.orders'), href: '/researcher/assignments' },
            { title: Assignment.surveyName ?? t('orders.surveyName') },
          ]}
        />

        <Tabs
          tabs={TABS({
            trans: t,
            id: query.id as string,
          })}
        />

        <SimpleTable
          columns={COLUMNS({ trans: t })}
          rows={rows}
        />
      </SidebarToggleLayout>
    </Container>
  );
};

export default DraftAnswers;
