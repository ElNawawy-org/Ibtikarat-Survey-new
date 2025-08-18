//TODO-refactorFile: -elnawawy- refactor this file and convert it to typescript
//TODO: -elnawawy- while adding TS, make sure to return a number only
/* eslint-disable no-constant-condition */
//Sorting function, that takes the array to be sorted, and sorting type (according to)
export const sorting = (order1, order2, type) => {
  //status sorting is not working fin as I didn't get the concept well, but the rest is working fine
  const sortCaseStatus = (status1, status2) => {
    if (status1 === 'ACTIVE' || 'OPENED') {
      return 1;
    } else if (status2 === 'ACTIVE' || 'OPENED') {
      return -1;
    }
  };

  const sortCase = () => {
    switch (type) {
      case 'title': {
        return order1.surveyName > order2.surveyName ? 1 : -1;
      }
      case 'responses': {
        //will not work
        return order1.survey.responsesNumber > order2.survey.responsesNumber
          ? -1
          : 1;
      }
      case 'status': {
        //will not work
        return sortCaseStatus(order1.status, order2.status);
      }
      case 'number': {
        //will not work
        return parseInt(order1.survey.id, 10) < parseInt(order2.survey.id, 10)
          ? -1
          : 1;
      }
      case 'lastUpdate': {
        //will not work
        return (
          new Date(order2.lastModifiedDate) - new Date(order1.lastModifiedDate)
        );
      }
      default: {
        return new Date(order2.createdDate) - new Date(order1.createdDate);
      }
    }
  };

  return sortCase();
};
