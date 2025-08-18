'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { AssignmentSidebar } from 'app/researcher/_components/assignment-sidebar';
import { CardInfo } from 'app/researcher/_components/card-info';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { callAPI } from 'app/researcher/_helpers/call-api';
import {
  assignmentQuery,
  dashboardQuery,
  phonesListQuery,
} from 'app/researcher/_gql/assignments/[id]/call-center.gql';
import { layoutAssignmentQuery } from 'app/researcher/_gql/assignments/[id]/general-info.gql';
import {
  CARDS,
  COLUMNS,
} from 'app/researcher/_data/assignments/[id]/call-center.data';
import { TABS } from 'app/researcher/_data/shared/index.data';
import {
  mapAssignment,
  mapDashboard,
} from 'app/researcher/_adapters/mappers/assignments/[id]/call-center.map';
import { mapLayoutAssignment } from 'app/researcher/_adapters/mappers/assignments/[id]/general-info.map';
import { E_CALL_CENTER_STATUSES } from 'app/researcher/_enums/assignments/[id]/call-center.enum';
import {
  TAssignment,
  TAssignmentResponse,
  TDashboard,
  TPhoneNumberResponse,
} from 'app/researcher/_types/assignments/[id]/call-center.type';
import {
  TLayoutAssignment,
  TLayoutAssignmentResponse,
} from 'app/researcher/_types/assignments/[id]/general-info.type';
import { BreadCrumb } from 'packages/bread-crumb';
import { Container } from 'packages/container';
import { SidebarToggleLayout } from 'packages/sidebar-toggle-layout';
import { SimpleTable } from 'packages/simple-table';
import { Tabs } from 'packages/tabs';

const {
  E_NO_RESPONSE,
  E_CONTINUE_LATER,
  E_REJECTED,
  E_CALL_LATER,
  E_CLOSED,
  E_NO_CONTINUE,
} = E_CALL_CENTER_STATUSES;

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
  orderDetails: {
    id: '',
    title: '',
    status: '',
  },
  assignmentId: '',
  surveyId: '',
  rejectRequestNotes: null,
  responses: 0,
  quantity: 0,
};

const dashboardInit = {
  [E_NO_RESPONSE]: 0,
  [E_CONTINUE_LATER]: 0,
  [E_REJECTED]: 0,
  [E_CALL_LATER]: 0,
  [E_CLOSED]: 0,
  [E_NO_CONTINUE]: 0,
};

const phonesListInit: TPhoneNumberResponse[] = [];

const CallCenter = () => {
  // Start Hooks
  const { t, lang } = useTranslation('common');
  const { query } = useRouter();

  const [LayoutAssignment, setLayoutAssignment] =
    useState<TLayoutAssignment>(layoutAssignmentInit);
  const [Assignment, setAssignment] = useState<TAssignment>(assignmentInit);
  const [Dashboard, setDashboard] = useState<TDashboard>(dashboardInit);
  const [PhonesList, setPhonesList] =
    useState<TPhoneNumberResponse[]>(phonesListInit);
  // End Hooks

  // Start Variables
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
  // End Variables

  // Start Data Fetching
  const getData = useCallback(async () => {
    const token = '';

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

    // ===============================
    // ===============================
    // ===============================

    const assignment: { assignmentByOrder: TAssignmentResponse } =
      await callAPI({
        body: {
          // TODO-refactor: This query will be refactored after moving the layoutAssignment out of this page
          query: assignmentQuery,
          variables: {
            orderId: query.id,
          },
        },
        token: token,
      });

    setAssignment(mapAssignment(assignment?.assignmentByOrder || {}));
  }, [query.id]);

  const getSurveyData = useCallback(async () => {
    const token = '';

    const dashboard = await callAPI({
      body: {
        query: dashboardQuery,
        variables: {
          surveyId: surveyId,
        },
      },
      token: token,
    });

    setDashboard(mapDashboard(dashboard?.callCenterDashboard || []));

    /* ============================== */
    /* ============================== */
    /* ============================== */

    const phonesList = await callAPI({
      body: {
        query: phonesListQuery,
        variables: {
          surveyId: surveyId,
          callCenterStatuses: ['CALL_LATER', 'CONTINUE_LATER'], // TODO-important: fix this hardcoded values
        },
      },
      token: token,
    });

    setPhonesList(phonesList?.callCenterNumberByStatus || []);
  }, [surveyId]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (surveyId) getSurveyData();
  }, [surveyId]);
  // End Data Fetching

  // Start Lists of rendered components
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

  const cardsList = CARDS({ data: Dashboard, trans: t }).map(
    ({ id, value, label, icon }) => (
      <CardInfo
        key={id}
        icon={icon}
        label={label}
        value={value}
      />
    )
  );

  const rows = PhonesList.map(
    ({ id, responseJson, callLaterDate, status }: TPhoneNumberResponse) => ({
      id: id,
      responseJson: responseJson,
      status: t(`callCenterStatus.${status}`),
      callLaterDate: callLaterDate || '',
      options: (
        <Link href={`/${lang}/survey/direct/call/${surveyUrl}/${assignmentId}`}>
          {t('supervisor.tables.openInitResponse')}
        </Link>
      ),
    })
  );

  // End Lists of rendered components

  return (
    // TODO-tsx: This container has to be in the layout instead of the page
    <Container>
      {/* TODO: follow the NextJS v15 meta */}
      <RenderMeta title={t('researcher.assignments')} />

      <SidebarToggleLayout toggleSideChildren={toggleSideChildren}>
        <BreadCrumb
          dataTest='survey-name'
          lang={lang as 'ar' | 'en'}
          links={[
            {
              title: t('titles.orders'),
              href: '/researcher/assignments',
            },
            {
              title: Assignment.orderDetails.title ?? t('orders.surveyName'),
            },
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

        <SimpleTable
          columns={COLUMNS({ trans: t })}
          rows={rows}
        />
      </SidebarToggleLayout>
    </Container>
  );
};

export default CallCenter;
