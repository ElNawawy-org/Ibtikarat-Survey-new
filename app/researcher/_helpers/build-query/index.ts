import { pageInfo } from 'pages/researcher/_gql/shared.gql';
import { TBuildQuery } from './type';

export const buildQuery: TBuildQuery = ({
  root,
  fields,
  params = [],
  includePageInfo = false,
}) => {
  const variablesDefinition = params
    .map(p => `$${p.name}: ${p.type}`)
    .join(', ');
  const argsDefinitions = params.map(p => `${p.name}: $${p.name}`).join(', ');

  return `
    query ${root}${params.length > 0 ? '(' + variablesDefinition + ')' : ''} {
      ${root}${params.length > 0 ? '(' + argsDefinitions + ')' : ''} {
        ${fields}
        ${includePageInfo ? pageInfo : ''}
      }
    }
  `;
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
