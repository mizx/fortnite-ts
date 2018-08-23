import { StatusResponse } from '../gateways/responses';
import { Status } from '../types';

export const mapStatusResponseToStatus = (response: StatusResponse): Status => {
  return response[0].status as Status;
};
