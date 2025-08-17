import { buildQuery } from 'app/researcher/_helpers/build-query';
import { orderId } from 'app/researcher/_gql/shared.gql';

const layoutAssignmentQuery = buildQuery({
  root: 'assignmentByOrder',
  params: [orderId],
  fields: `
    id
    status
    price
    quantity
    responses
    rejectRequestNotes
    order {
      survey {
        id
        uniqueUrl
        surveyJson
        status
        surveyType
        surveyScale {
          id
        }
        collect {
          startDate
          endDate
        }
      }
    }
  `,
});

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

const researcherPerformanceQuery = buildQuery({
  root: 'responsePerformanceResearcher',
  params: [orderId],
  fields: `
    responses
    rejectedResponses
    responseByDay {
      dayOfWeek
      responseCount
    }
    responseByHour {
      hourOfDay
      responseCount
    }
  `,
});

export { layoutAssignmentQuery, assignmentQuery, researcherPerformanceQuery };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
