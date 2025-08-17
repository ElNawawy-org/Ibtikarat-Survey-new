import { useRouter } from 'next/router';
import OrdersSurvey from '@components/orders/orders-survey';
import useGql, { Mark } from '@hooks/useGql';
import { shortResponse } from 'gql/researcher';
import { assignmentsByTypeOnResearcher } from 'gql/user';

const EditResponse = () => {
  //Start Hooks
  const {
    query: { id, responseId },
    push,
  } = useRouter();

  const { data } = useGql(
    'order',
    {
      body: assignmentsByTypeOnResearcher,
      vars: { id },
    },
    ['order', id]
  );

  const { data: response } = useGql(
    'response',
    {
      body: shortResponse,
      vars: { id: Mark(responseId) },
    },
    ['id']
  );
  //End Hooks

  if (!response || !data) return <>Loading..</>;

  return (
    <OrdersSurvey
      id={data?.order?.survey?.id}
      response={response?.response}
      fullPage={true}
      routerOnComplete={() =>
        push(`/researcher/assignments/${id}/general-info`)
      }
    />
  );
};

export default EditResponse;
