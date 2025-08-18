'use client';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';
import { CardClickableDetailed } from 'app/researcher/_components/card-clickable-detailed';
import { RenderMeta } from 'app/researcher/_components/render-meta';
import { callAPI } from 'app/researcher/_helpers/call-api';
import { assignmentsQuery } from 'app/researcher/_gql/assignments/index.gql';
import { PAGE_SIZE } from 'app/researcher/_data/shared/constants.data';
import { mapAssignments } from 'app/researcher/_adapters/mappers/assignments/index.map';
import { FilterIcon } from 'app/researcher/_assets/icons/filter-icon';
import {
  TAssignmentsResponse,
  TAssignment,
} from 'app/researcher/_types/assignments/index.type';
// import OrdersDatePickers from '@components/shared/orders-date-pickers'; //TODO-convert-to-package: Remove
import { Container } from 'packages/container';
import { SearchField } from 'packages/fields/search-field';
import { SelectFieldSimple } from 'packages/fields/select-field-simple';
import { Pagination } from 'packages/pagination';

const assignmentsInit: TAssignment[] = [];

const Assignments = () => {
  // Start Hooks
  const { t, lang } = useTranslation('common');

  const [Assignments, setAssignments] =
    useState<TAssignment[]>(assignmentsInit);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [NumberOfPages, setNumberOfPages] = useState<number>(1);
  const [Search, setSearch] = useState<string>('');
  const [StatusValue, setStatusValue] = useState<string>('1');
  // End Hooks

  // Start Data Fetching
  const getData = useCallback(async () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyN2U1R0RYMHdpX05IenBsSFktaS1aODlvcXVJNWttTDlhQ0F4N29EOTlNIn0.eyJleHAiOjE3NTU1MTY5MzQsImlhdCI6MTc1NTUxMzMzNCwiYXV0aF90aW1lIjoxNzU1NTEzMzI4LCJqdGkiOiIxNTY4ZDZhNS0yNzE0LTQ3Y2ItOThmZS1iMDU3NjE4Nzg5YTQiLCJpc3MiOiJodHRwczovL2F1dGguZGVtLmRldi9yZWFsbXMvc3RhZ2luZyIsInN1YiI6IjhiYzE2YmMzLWY5OGUtNDFmMS1iZTE0LWFlNjg2MzA3YmY1YSIsInR5cCI6IkJlYXJlciIsImF6cCI6InN1cnZleS1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiIwYWZhMTFlOS00Y2JjLTQ0ZTYtOWRmMC0zNzFhNDE1Yjg3NjgiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQkFDS09GRklDRV9SRVNFQVJDSEVSIl19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiMGFmYTExZTktNGNiYy00NGU2LTlkZjAtMzcxYTQxNWI4NzY4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InJlc2VhcmNoZXJAZGVtLmRldiIsImVtYWlsIjoicmVzZWFyY2hlckBkZW0uZGV2In0.g3YwLjfB24BJwluUnbx9hGGm9-tQxWSqTH6mHZrEnU7e0PZrIPhh_S6jP5nlEyC2SW9Q2LX9bafTCY6XC7AJALIRIhbDZmxgpDj_A1Q-JKCYXoZW9Ii0LmHx_7AOoEzfQ52xVqrZmhicPffatyeyPFP81Dc55-Hu-zLZMoUtHfUEvURIMIS4O_P0xMs3A8ZGWuIDL80y5Hun5923Kispk4O9zldIJN9VA6PmA-nKAcvinTSTRYSsMaE3g0WSDTD94ZxVhOSB3Kk2qFNYjtWBvDS9ljXB6ZuhCgn85E6KA3CF0oKhFIrl8rtZSkFUEy2ndCVE5usuMnp81nsQgu1UjQ';

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
  }, [CurrentPage, Search]);

  useEffect(() => {
    getData();
  }, [CurrentPage]);
  // End Data Fetching

  // Start Lists of rendered components
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
  // End Lists of rendered components

  return (
    // TODO-tsx: This container has to be in the layout instead of the page
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
          {/*
          <OrdersDatePickers selector='operatorOrders.filters' />
        */}
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
