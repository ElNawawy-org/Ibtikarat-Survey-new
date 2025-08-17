const DashboardDummy = {
  callCenterDashboard: [
    {
      count: 7,
      status: 'CALL_LATER',
    },
    {
      count: 1,
      status: 'CONTINUE_LATER',
    },
    {
      count: 1,
      status: 'RESERVED',
    },
  ],
};

const NumberByStatusDummy = {
  callCenterNumberByStatus: [
    {
      id: '332859',
      responseJson: '{"mobile": "507315824"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '332148',
      responseJson: '{"mobile": "509985122"}',
      callLaterDate: null,
      status: 'CONTINUE_LATER',
    },
    {
      id: '332360',
      responseJson: '{"mobile": "500554291"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '332343',
      responseJson: '{"mobile": "506106198"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '334693',
      responseJson: '{"mobile": "504756424"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '332512',
      responseJson: '{"mobile": "500856324"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '332546',
      responseJson: '{"mobile": "507195460"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
    {
      id: '330246',
      responseJson: '{"mobile": "501465149"}',
      callLaterDate: '2025-08-01T00:00',
      status: 'CALL_LATER',
    },
  ],
};

export { DashboardDummy, NumberByStatusDummy };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
