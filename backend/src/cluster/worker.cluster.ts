import App from '@/App';
import { BaseClusterHandler } from '@bestnetlib/common';

export class WorkerClusterHandler extends BaseClusterHandler {
  public async handle(): Promise<void> {
    App.loadLogger();
    await App.loadNats();
    await App.loadDatabase();
    App.loadServer();
  }
}
