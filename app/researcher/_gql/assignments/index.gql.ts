import { buildQuery } from 'app/researcher/_helpers/build-query';
import {
  assignmentType,
  page,
  size,
  orderName,
  startDate,
  endDate,
  status,
} from 'app/researcher/_gql/shared.gql';

export const assignmentsQuery = buildQuery({
  root: 'assignmentsByType',
  params: [assignmentType, page, size, orderName, startDate, endDate, status],
  fields: `
    assignments {
      id
      quantity
      price
      responses
      status
      order {
        id
        survey {
          surveyName
          uniqueUrl
        }
      }
    }
  `,
  includePageInfo: true,
});

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
