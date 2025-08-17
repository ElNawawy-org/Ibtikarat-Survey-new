import { buildQuery } from 'app/researcher/_helpers/build-query';
import { page, size } from 'app/researcher/_gql/shared.gql';

export const assignmentsQuery = buildQuery({
  root: 'myFinishedAssignments',
  params: [page, size],
  fields: `
    assignments {
      quantity
      order {
        id
        survey {
          surveyName
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
