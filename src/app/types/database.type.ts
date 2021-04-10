import { Cluster } from "./cluster.type";

export interface Database {
  mainCluster: Cluster;
  workerClusters: Cluster[];
  storage: number;
  region: string;
  name: string;
}
