import { buildQuery } from 'pages/researcher/_helpers/build-query';
import { orderId } from 'pages/researcher/_gql/shared.gql';

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

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
