import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { AssignmentSidebar } from 'app/researcher/_components/assignment-sidebar';
import { CardInfo } from 'app/researcher/_components/card-info';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { callAPI } from 'app/researcher/_helpers/call-api';
import { layoutAssignmentQuery } from 'app/researcher/_gql/assignments/[id]/general-info.gql';
import { assignmentQuery } from 'app/researcher/_gql/assignments/[id]/targeted-category.gql';
import {
  CARDS,
  COLUMNS,
} from 'app/researcher/_data/assignments/[id]/targeted-category.data';
import { TABS } from 'app/researcher/_data/shared/index.data';
import { mapLayoutAssignment } from 'app/researcher/_adapters/mappers/assignments/[id]/general-info.map';
import {
  mapAssignment,
  mapTargetAudience,
} from 'app/researcher/_adapters/mappers/assignments/[id]/targeted-category.map';
import {
  TLayoutAssignment,
  TLayoutAssignmentResponse,
} from 'app/researcher/_types/assignments/[id]/general-info.type';
import {
  TAssignment,
  TAssignmentResponse,
  TTargetAudience,
} from 'app/researcher/_types/assignments/[id]/targeted-category.type';
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
  price: 0,
  numberOfRequiredAnswers: 0,
  surveyName: '',
};

const targetAudienceInit: TTargetAudience = [
  {
    name: '',
    details: [],
  },
];

const TargetedCategory = () => {
  // Start Hooks
  const { t, lang } = useTranslation('common');
  const { query } = useRouter();

  const [LayoutAssignment, setLayoutAssignment] =
    useState<TLayoutAssignment>(layoutAssignmentInit);
  const [Assignment, setAssignment] = useState<TAssignment>(assignmentInit);
  const [TargetAudience, setTargetAudience] =
    useState<TTargetAudience>(targetAudienceInit);
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
      mapLayoutAssignment(
        layoutAssignment?.assignmentByOrder || { order: { survey: {} } }
      )
    );

    // ===============================
    // ===============================
    // ===============================

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

    // TODO-Business: how can I get the target audience?
    // TODO-Business: Is it really a data of table, or a single record?
    setTargetAudience(
      mapTargetAudience(assignment?.assignmentByOrder.quantity || 0)
    );
  }, [query.id]);

  useEffect(() => {
    getData();
  }, []);
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

  const cardsList = CARDS({ data: Assignment, trans: t }).map(
    ({ id, value, label, icon }) => (
      <CardInfo
        key={id}
        icon={icon}
        label={label}
        value={value}
      />
    )
  );

  const rows = TargetAudience.map(({ name, details }) => {
    const detailsList = details.map(text => (
      <p
        key={text}
        className='text-md bg-grey-400! px-7 pt-1 capitalize'
      >
        {text}
      </p>
    ));

    return {
      id: name,
      name: name,
      details: <div className='flex gap-1 justify-center'>{detailsList}</div>,
    };
  });
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

        <SimpleTable
          header={t('admin.order.quote.whatAreTargetAudiences')}
          columns={COLUMNS({ trans: t })}
          rows={rows}
        />
      </SidebarToggleLayout>
    </Container>
  );
};

export default TargetedCategory;
