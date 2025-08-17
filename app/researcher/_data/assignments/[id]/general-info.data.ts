import { T_CARDS } from 'app/researcher/_types/assignments/[id]/general-info.type';

const CARDS: T_CARDS = ({
  data: { responses, rejectedResponses, progressPercentage, profit },
  trans,
}) => [
  {
    id: '1',
    value: responses,
    label: trans('orders.order.cards.numberOfAnswers'),
    description: trans('orders.order.cards.numberOfAnswersDesc'),
  },
  {
    id: '2',
    value: rejectedResponses,
    label: trans('orders.order.cards.rejectedNumberOfAnswers'),
    description: trans('orders.order.cards.rejectedNumberOfAnswersDesc'),
  },
  {
    id: '3',
    value: progressPercentage + '%',
    label: trans('common:ordersQuotes.performance'),
    description: trans('orders.order.cards.performanceDesc'),
  },
  {
    id: '4',
    value: profit,
    label: trans('orders.order.cards.priceEarned'),
    description: trans('orders.order.cards.priceEarnedDesc'),
  },
];

export { CARDS };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
