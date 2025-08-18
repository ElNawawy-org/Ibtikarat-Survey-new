import { buildQuery } from 'app/researcher/_helpers/build-query';
import { orderId } from 'app/researcher/_gql/shared.gql';

const assignmentQuery = buildQuery({
  root: 'assignmentByOrder',
  params: [orderId],
  fields: `
    price
    quantity
    order {
      survey {
        surveyName
      }
    }
  `,
});

export { assignmentQuery };
