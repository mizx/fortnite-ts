import { get } from 'request-promise-native';
import { StatusResponse } from '../types/external';
import { STATUS_ENDPOINT } from '../urls.json';

export const fetchStatus = async (token: string): Promise<StatusResponse> => {
  const headers = { authorization: `bearer ${token}` };
  const options = { headers, json: true, url: STATUS_ENDPOINT };

  return await get(options);
};
