import { get } from 'request-promise-native';
import { URL } from 'url';
import { StatusResponse } from './responses';

export const STATUS_ENDPOINT = new URL('https://lightswitch-public-service-prod06.ol.epicgames.com/lightswitch/api/service/bulk/status?serviceId=Fortnite');

export const fetchStatus = async (token: string): Promise<StatusResponse> => {
  const headers = { authorization: `bearer ${token}` };
  const options = { headers, json: true, url: STATUS_ENDPOINT };

  return await get(options);
};
