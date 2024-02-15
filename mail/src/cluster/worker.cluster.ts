import App from '@/App';
import { BaseClusterHandler } from '@bestnetlib/common';

export class WorkerClusterHandler extends BaseClusterHandler {
  public async handle(): Promise<void> {
    await App.loadNats();
    App.loadListener();
    App.loadMail();
    App.loadServer();
  }
}
