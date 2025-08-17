const dataDummy = {
  targetAudience: {
    gender: {
      min: null,
      max: null,
    },
    age: {
      min: 0,
      max: 0,
    },
    income: {
      min: 0,
      max: 0,
    },
    geographic: {
      regions: [],
      cities: [],
      isSampleSizeRequired: false,
      sampleSize: [],
    },
    education: [],
    maritalStatus: [],
    employmentStatus: [],
    numberOfResponses: 50,
  },
};

const reorderDataDummy = [
  {
    name: 'عدد الاستجابات',
    details: [10, 20, 30],
  },
  {
    name: 'عدد الاستجابات 2',
    details: [1, 2, 3],
  },
];

export { dataDummy, reorderDataDummy };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
