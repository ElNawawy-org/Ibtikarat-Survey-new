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
