import { buildQuery } from 'app/researcher/_helpers/build-query';

export const researcherQuery = buildQuery({
  root: 'researcherDashboard',
  fields: `
    assignments {
      quantity
      responses
      order {
        id
        survey {
          surveyName
        }
      }
    }

    orderStatics {
      newOrders
      inprogress
      accomplished
      rejected
    }
  `,
});

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
