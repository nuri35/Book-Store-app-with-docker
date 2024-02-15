import 'reflect-metadata';
import { ManagerCluster } from '@bestnetlib/common';
import { WorkerClusterHandler } from '@cluster/worker.cluster';
import App from '@/App';
import { logger } from '@logger/custom.logger';

const start = async () => {
  try {
    App.loadLogger();
    const clusterManager = ManagerCluster.getInstance(
      new WorkerClusterHandler()
    );
    await clusterManager.start();
  } catch (err: any) {
    logger.client.error(err.message);
  }
};

start();
