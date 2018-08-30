type Status = 'UP' | 'DOWN';
type Actions = 'PLAY' | 'DOWNLOAD';

export interface StatusResponseItem {
  serviceInstanceId: string;
  status: Status;
  message: string;
  maintenanceUri: string | null; // assumption
  overrideCatalogIds: string[];
  allowedActions: Actions[];
  banned: boolean;
  launcherInfoDTO: {
    appName: string;
    catalogItemId: string;
    namespace: string;
  };
}

export type StatusResponse = StatusResponseItem[];
