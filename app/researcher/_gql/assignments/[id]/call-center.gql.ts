import { buildQuery } from 'pages/researcher/_helpers/build-query';
import {
  orderId,
  surveyId,
  callCenterStatuses,
} from 'pages/researcher/_gql/shared.gql';

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

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
