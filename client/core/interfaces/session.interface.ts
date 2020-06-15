import { Session as SessionGQL } from '@common/gql/graphql.schema.generated';

export interface Session extends SessionGQL {
  isLogged?: boolean;
}
