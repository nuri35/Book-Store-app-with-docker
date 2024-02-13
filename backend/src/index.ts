import 'reflect-metadata';
import { WorkerClusterHandler } from '@cluster/worker.cluster';
import { logger } from '@/logger/custom.logger';
import { ManagerCluster } from '@bestnetlib/common';

const start = async () => {
  try {
    const clusterManager = ManagerCluster.getInstance(
      new WorkerClusterHandler()
    );
    await clusterManager.start();
  } catch (err: any) {
    logger.client.error(err.message);
  }
};

start();
