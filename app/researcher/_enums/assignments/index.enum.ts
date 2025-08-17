enum E_ASSIGNMENT_STATUSES {
  E_PENDING_FOR_APPROVAL = 'PENDING_FOR_APPROVAL',
  E_REJECTED_CHANGE_REQUEST = 'REJECTED_CHANGE_REQUEST',
  E_REJECTED = 'REJECTED',
  E_IN_PROGRESS = 'IN_PROGRESS',
}

export { E_ASSIGNMENT_STATUSES };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
