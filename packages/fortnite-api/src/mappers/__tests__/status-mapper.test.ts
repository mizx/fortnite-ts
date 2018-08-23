import { fetchStatus } from '../../gateways';
import { mapStatusResponseToStatus } from '../status-mapper';

jest.mock('../../gateways');

describe('Status Mapper', () => {
  describe('mapStatusResponseToStatus', () => {
    it('should return status', async () => {
      const response = await fetchStatus('');
      const result = mapStatusResponseToStatus(response);

      expect(result).toBe(response[0].status);
    });
  });
});
