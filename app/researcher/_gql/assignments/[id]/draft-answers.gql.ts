import { buildQuery } from 'app/researcher/_helpers/build-query';
import { assignmentId, orderId } from 'app/researcher/_gql/shared.gql';

const assignmentQuery = buildQuery({
  root: 'assignmentByOrder',
  params: [orderId],
  fields: `
    order {
      survey {
        surveyName
      }
    }
  `,
});

const draftAnswersQuery = buildQuery({
  root: 'draftResponses',
  params: [assignmentId],
  fields: `
    id
    responseJson
  `,
});

export { assignmentQuery, draftAnswersQuery };
