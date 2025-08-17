import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { CardClickableDetailed } from 'pages/researcher/_components/card-clickable-detailed';
import { RenderMeta } from 'pages/researcher/_components/render-meta';
import { callAPI } from 'pages/researcher/_helpers/call-api';
import { assignmentsQuery } from 'pages/researcher/_gql/assignments/index.gql';
import { PAGE_SIZE } from 'pages/researcher/_data/shared/constants.data';
import { mapAssignments } from 'pages/researcher/_adapters/mappers/assignments/index.map';
import { FilterIcon } from 'pages/researcher/_assets/icons/filter-icon';
import {
  TAssignmentsResponse,
  TAssignment,
} from 'pages/researcher/_types/assignments/index.type';
import OrdersDatePickers from '@components/shared/orders-date-pickers'; //TODO-convert-to-package: Remove
import { useDispatch } from '@util/noval'; //TODO-noval: remove
import { Container } from 'packages/container';
import { SearchField } from 'packages/fields/search-field';
import { SelectFieldSimple } from 'packages/fields/select-field-simple';
import { Pagination } from 'packages/pagination';

const assignmentsInit: TAssignment[] = [];

const Assignments = () => {
  //Start Hooks
  const { t, lang } = useTranslation('common');
  const { push } = useRouter();
  //TODO-noval: fix this error
  //@ts-expect-error ts(2349)
  const { dispatch } = useDispatch();
  const [Assignments, setAssignments] =
    useState<TAssignment[]>(assignmentsInit);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [NumberOfPages, setNumberOfPages] = useState<number>(1);
  const [Search, setSearch] = useState<string>('');
  const [StatusValue, setStatusValue] = useState<string>('1');
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
          assignmentType: 'RESEARCHER',
          orderName: Search,
          startDate: '',
          endDate: '',
          status: '',
        },
      },
      token: token,
    });

    const assignments = mapAssignments(
      data?.assignmentsByType?.assignments || []
    );

    setAssignments(assignments);
    setNumberOfPages(data?.assignmentsByType?.pageInfo?.totalPages);
  }, [activeToken, CurrentPage, Search]);

  useEffect(() => {
    getData();
    //TODO-noval: this warning will stop when stop using the noval dispatch
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentPage]);
  //End Data Fetching

  //Start Lists of rendered components
  const cardsList = Assignments?.map(
    ({
      orderDetails,
      assignmentId,
      surveyId,
      responsesIsComplete,
      disableOpenSurveyButton,
    }) => {
      return (
        <CardClickableDetailed
          key={orderDetails.id}
          orderDetails={orderDetails}
          trans={t}
          assignmentId={assignmentId}
          surveyId={surveyId}
          responsesIsComplete={responsesIsComplete}
          disableOpenSurveyButton={disableOpenSurveyButton}
          lang={lang}
        />
      );
    }
  );
  //End Lists of rendered components

  return (
    //TODO-tsx: This container has to be in the layout instead of the page
    <Container>
      {/* TODO: follow the NextJS v15 meta */}
      <RenderMeta title={t('titles.orders')} />

      <section className='grid gap-8'>
        <h1 className='capitalize text-lg 2xl:text-2xl font-bold'>
          {t('titles.orders')}
        </h1>

        <div
          data-name='filters'
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        >
          <SearchField
            value={Search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('admin.order.searchLabel')}
          />

          <SelectFieldSimple
            value={StatusValue}
            onChange={setStatusValue}
            options={[
              { label: t('supervisor.assignedOrders.allOrders'), value: '1' },
              {
                label: t('supervisor.assignedOrders.new'),
                value: 'PENDING_FOR_APPROVAL',
              },
              {
                label: t('supervisor.assignedOrders.inProgress'),
                value: 'IN_PROGRESS',
              },
            ]}
            placeholder='Select options...'
            searchPlaceholder='Search...'
            noOptions='No Options Available'
            icon={<FilterIcon />}
            label={t('common.select.viewByStatus')}
          />

          <OrdersDatePickers selector='operatorOrdersFilteration.filters' />
        </div>

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

export default Assignments;
