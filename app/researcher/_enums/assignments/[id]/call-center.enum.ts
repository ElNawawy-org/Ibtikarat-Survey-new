enum E_CALL_CENTER_STATUSES {
  E_NO_RESPONSE = 'NO_RESPONSE',
  E_CONTINUE_LATER = 'CONTINUE_LATER',
  E_REJECTED = 'REJECTED',
  E_CALL_LATER = 'CALL_LATER',
  E_CLOSED = 'CLOSED',
  E_NO_CONTINUE = 'NO_CONTINUE',
}

export { E_CALL_CENTER_STATUSES };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
