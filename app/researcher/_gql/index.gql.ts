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
