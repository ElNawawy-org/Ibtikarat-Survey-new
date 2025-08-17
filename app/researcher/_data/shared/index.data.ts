import { EyeIcon } from 'app/researcher/_assets/icons/eye-icon';
import { OverviewIcon } from 'app/researcher/_assets/icons/overview-icon';
import { TTabsParams } from 'app/researcher/_types/shared.type';
import { TTab } from 'packages/tabs/type';

type T_TABS = (params: TTabsParams) => TTab[];

const TABS: T_TABS = ({ trans, id }) => [
  {
    title: trans('common:supervisor.survey.tabs.general'),
    href: `/researcher/assignments/${id}/general-info`,
    icon: OverviewIcon,
  },
  {
    title: trans('common:supervisor.survey.tabs.environment'),
    href: `/researcher/assignments/${id}/targeted-category`,
    icon: EyeIcon,
  },
  {
    title: trans('common:supervisor.survey.tabs.callCenter'),
    href: `/researcher/assignments/${id}/call-center`,
    icon: OverviewIcon,
  },
  {
    title: trans('common:supervisor.survey.tabs.draftResponses'),
    href: `/researcher/assignments/${id}/draft-answers`,
    icon: OverviewIcon,
  },
];

export { TABS };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
