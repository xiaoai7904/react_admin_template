import { History } from 'history';

export interface CommonProps {
  history?: History;
  location?: Location;
  match?: Match;
  staticContext?: any;
}

export interface Location {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state?: {
    hash?: string;
    pathname?: string;
    search?: string;
    state?: any;
  };
}

export interface Match {
  isExact?: boolean;
  params?: object;
  path?: string;
  url?: string;
}
