import {
  TAssignment,
  TAssignmentResponse,
  TLayoutAssignment,
  TLayoutAssignmentResponse,
  TResearcherPerformanceResponse,
} from 'app/researcher/_types/assignments/[id]/general-info.type';
import { TTrans } from 'app/researcher/_types/shared.type';

//TODO-typescript: move these types to a separate file
type TMapLayoutAssignment = (
  assignment: TLayoutAssignmentResponse
) => TLayoutAssignment;

type TAssignmentParams = {
  assignment: TAssignmentResponse;
  researcherPerformance: TResearcherPerformanceResponse;
  trans: TTrans;
};
type TMapAssignment = (params: TAssignmentParams) => TAssignment;

const mapLayoutAssignment: TMapLayoutAssignment = ({
  id,
  status,
  price,
  quantity,
  rejectRequestNotes,
  responses,
  order,
}) => {
  return {
    assignmentId: id,
    assignmentStatus: status,
    price: price,
    numberOfRequiredAnswers: quantity,
    rejectRequestNotes: rejectRequestNotes,
    responsesIsComplete: responses >= quantity,
    surveyId: order?.survey?.id,
    surveyScaleId: order?.survey?.surveyScale?.id,
    surveyJson: order?.survey?.surveyJson,
    surveyStatus: order?.survey?.status,
    surveyType: order?.survey?.surveyType,
    surveyUrl: order?.survey?.uniqueUrl,
    startDate: order?.survey?.collect?.startDate,
    endDate: order?.survey?.collect?.endDate,
  };
};

const mapAssignment: TMapAssignment = ({
  assignment,
  researcherPerformance,
  trans,
}) => {
  const {
    quantity,
    price,
    status,
    order
  } = assignment;

  const survey = order?.survey;
  const { responses, rejectedResponses, responseByDay, responseByHour } =
    researcherPerformance;

  const progressPercentage = parseFloat(
    (((responses - rejectedResponses) / quantity) * 100).toFixed(1)
  );
  const profitInit = (responses - rejectedResponses) * price;

  const profit =
    status === 'EXECUTED'
      ? `${profitInit} ${trans('ordersQuotes.SAR')}`
      : trans('orders.order.cards.priceWait');

  const responsesByDay = responseByDay.map(day => ({
    name: day.dayOfWeek,
    numberOfAnswers: +day.responseCount,
  }));

  const responsesByHour = responseByHour.map(hour => ({
    name: hour.hourOfDay,
    numberOfAnswers: +hour.responseCount,
  }));

  return {
    surveyName: survey?.surveyName,
    progressPercentage,
    profit,
    responses,
    rejectedResponses,
    responsesByDay,
    responsesByHour,
  };
};

export { mapLayoutAssignment, mapAssignment };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
