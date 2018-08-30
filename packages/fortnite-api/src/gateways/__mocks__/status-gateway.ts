import { StatusResponse } from '../../types/external';

const STATUS_RESPONSE_OFFLINE: StatusResponse = [
  {
      serviceInstanceId: 'fortnite',
      status: 'DOWN',
      message: 'Down for maintenance',
      maintenanceUri: null,
      overrideCatalogIds: [
          'catalog-id'
      ],
      allowedActions: [
          'PLAY',
          'DOWNLOAD'
      ],
      banned: false,
      launcherInfoDTO: {
          appName: 'Fortnite',
          catalogItemId: 'catalog-item-id',
          namespace: 'fn'
      }
  }
];

// TODO: Fetch online status
const STATUS_RESPONSE_ONLINE: StatusResponse = [];

export const fetchStatus = jest.fn(async () => STATUS_RESPONSE_OFFLINE);
