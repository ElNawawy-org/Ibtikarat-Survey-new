import { buildQuery } from 'app/researcher/_helpers/build-query';
import {
  orderId,
  surveyId,
  callCenterStatuses,
} from 'app/researcher/_gql/shared.gql';

const assignmentQuery = buildQuery({
  root: 'assignmentByOrder',
  params: [orderId],
  fields: `
    id
    quantity
    responses
    status
    rejectRequestNotes
    order {
      id
      survey {
        surveyName
        uniqueUrl
      }
    }
  `,
});

const dashboardQuery = buildQuery({
  root: 'callCenterDashboard',
  params: [surveyId],
  fields: `
    count
    status
  `,
});

const phonesListQuery = buildQuery({
  root: 'callCenterNumberByStatus',
  params: [surveyId, callCenterStatuses],
  fields: `
    id
    responseJson
    callLaterDate
    status
  `,
});

export { assignmentQuery, dashboardQuery, phonesListQuery };
