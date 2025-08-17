import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { AssignmentSidebar } from 'pages/researcher/_components/assignment-sidebar';
import { CardInfo } from 'pages/researcher/_components/card-info';
import { RenderMeta } from 'pages/researcher/_components/render-meta';
import { callAPI } from 'pages/researcher/_helpers/call-api';
import {
  assignmentQuery,
  layoutAssignmentQuery,
  researcherPerformanceQuery,
} from 'pages/researcher/_gql/assignments/[id]/general-info.gql';
import { CARDS } from 'pages/researcher/_data/assignments/[id]/general-info.data';
import { TABS } from 'pages/researcher/_data/shared/index.data';
import {
  mapAssignment,
  mapLayoutAssignment,
} from 'pages/researcher/_adapters/mappers/assignments/[id]/general-info.map';
import {
  TAssignment,
  TAssignmentResponse,
  TLayoutAssignment,
  TLayoutAssignmentResponse,
  TResearcherPerformanceResponse,
} from 'pages/researcher/_types/assignments/[id]/general-info.type';
import { useDispatch } from '@util/noval';
import { BreadCrumb } from 'packages/bread-crumb';
import { Container } from 'packages/container';
import { Diagram } from 'packages/diagram';
import { SidebarToggleLayout } from 'packages/sidebar-toggle-layout';
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
  progressPercentage: 0,
  profit: '',
  responses: 0,
  rejectedResponses: 0,
  responsesByDay: [],
  responsesByHour: [],
};

const GeneralInfo = () => {
  //Start Hooks
  const { t, lang } = useTranslation('common');
  const { push, query } = useRouter();
  //TODO-noval: fix this error
  //@ts-expect-error ts(2349)
  const { dispatch } = useDispatch();
  const [LayoutAssignment, setLayoutAssignment] =
    useState<TLayoutAssignment>(layoutAssignmentInit);
  const [Assignment, setAssignment] = useState<TAssignment>(assignmentInit);
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

  const responsesByDay = Assignment.responsesByDay.map(
    ({ name, numberOfAnswers }) => ({
      name: t(`dayOfWeek.${name}`),
      numberOfAnswers: numberOfAnswers,
    })
  );
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

    const researcherPerformance: {
      responsePerformanceResearcher: TResearcherPerformanceResponse;
    } = await callAPI({
      body: {
        query: researcherPerformanceQuery,
        variables: {
          orderId: query.id,
        },
      },
      token: token,
    });

    setAssignment(
      mapAssignment({
        assignment: assignment?.assignmentByOrder || {},
        researcherPerformance:
          researcherPerformance?.responsePerformanceResearcher || {},
        trans: t,
      })
    );
  }, [activeToken, query.id, t]);

  useEffect(() => {
    getData();
    //TODO-noval: this warning will stop when stop using the noval dispatch
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const cardsList = CARDS({ data: Assignment, trans: t }).map(
    ({ id, value, label, description }) => (
      <CardInfo
        key={id}
        label={label}
        value={value}
        desc={description}
      />
    )
  );
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

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
          {cardsList}
        </div>

        <div className='bg-white px-5 py-3 border border-grey-400 flex justify-between'>
          <Diagram
            data={responsesByDay}
            firstTitle={t('orders.table.diagram.thisWeek')}
            secondTitle={t('orders.table.diagram.forThisWeek')}
          />
        </div>

        <div className='bg-white px-5 py-3 border border-grey-400 flex justify-between'>
          <Diagram
            data={Assignment.responsesByHour}
            firstTitle={t('orders.table.diagram.thisDay')}
            secondTitle={t('orders.table.diagram.forThisDay')}
          />
        </div>
      </SidebarToggleLayout>
    </Container>
  );
};

export default GeneralInfo;
