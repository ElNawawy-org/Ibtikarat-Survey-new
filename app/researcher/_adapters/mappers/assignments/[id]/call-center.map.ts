import { E_CALL_CENTER_STATUSES } from 'app/researcher/_enums/assignments/[id]/call-center.enum';
import {
  TAssignment,
  TAssignmentResponse,
  TDashboard,
  TDashboardResponse,
} from 'app/researcher/_types/assignments/[id]/call-center.type';

type TMapAssignment = (assignment: TAssignmentResponse) => TAssignment;
type TMapDashboard = (Dashboard: TDashboardResponse) => TDashboard;

const mapAssignment: TMapAssignment = ({
  id,
  quantity,
  responses,
  status,
  rejectRequestNotes,
  order,
}) => {
  return {
    orderDetails: {
      id: order?.id,
      title: order?.survey?.surveyName,
      status,
    },
    assignmentId: id,
    surveyId: order?.survey?.uniqueUrl,
    rejectRequestNotes,
    responses,
    quantity,
  };
};

const mapDashboard: TMapDashboard = Dashboard => {
  const {
    E_NO_RESPONSE,
    E_CONTINUE_LATER,
    E_REJECTED,
    E_CALL_LATER,
    E_CLOSED,
    E_NO_CONTINUE,
  } = E_CALL_CENTER_STATUSES;

  return {
    [E_NO_RESPONSE]:
      Dashboard.find(({ status }) => status === E_NO_RESPONSE)?.count || 0,
    [E_CONTINUE_LATER]:
      Dashboard.find(({ status }) => status === E_CONTINUE_LATER)?.count || 0,
    [E_REJECTED]:
      Dashboard.find(({ status }) => status === E_REJECTED)?.count || 0,
    [E_CALL_LATER]:
      Dashboard.find(({ status }) => status === E_CALL_LATER)?.count || 0,
    [E_CLOSED]: Dashboard.find(({ status }) => status === E_CLOSED)?.count || 0,
    [E_NO_CONTINUE]:
      Dashboard.find(({ status }) => status === E_NO_CONTINUE)?.count || 0,
  };
};

export { mapAssignment, mapDashboard };
