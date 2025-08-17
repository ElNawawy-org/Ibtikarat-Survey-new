const pageInfo = `
    pageInfo {
        totalPages
    }
`;

const assignmentType = { name: 'assignmentType', type: 'AssignmentType' };
const page = { name: 'page', type: 'String' };
const size = { name: 'size', type: 'String' };
const orderName = { name: 'orderName', type: 'String' };
const startDate = { name: 'startDate', type: 'String' };
const endDate = { name: 'endDate', type: 'String' };
const status = { name: 'status', type: 'String' };
const orderId = { name: 'orderId', type: 'ID' };
const assignmentId = { name: 'assignmentId', type: 'ID' };
const surveyId = { name: 'surveyId', type: 'ID!' };
const callCenterStatuses = {
  name: 'callCenterStatuses',
  type: '[CallCenterStatus]!',
};

export {
  pageInfo,
  assignmentType,
  page,
  size,
  orderName,
  startDate,
  endDate,
  status,
  orderId,
  assignmentId,
  surveyId,
  callCenterStatuses,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
