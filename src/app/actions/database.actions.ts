import { Action, createAction, props } from "@ngrx/store";
import { Database, Cluster } from "../types";

export enum DatabaseActionTypes {
  LoadDatabase = "[DB] Load Database information",
  StopDatabase = "[DB] Stop Database and all clusters",
  StartDatabase = "[DB] Start Database",
  StartMainCluster = "[Main Cluster] Start Main Cluster",
  StopWorkerCluster = "[Worker Cluster] Stop Worker Cluster",
  StartWorkerCluster = "[Worker Cluster] Start Worker Cluster",
  AddWorkerCluster = "[Worker Cluster] Add new Worker Cluster"
}

export class DatabaseAction implements Action {
  type: string;
  payload: {
    databaseData: Database;
  };
}

export const loadDatabase = createAction(
  DatabaseActionTypes.LoadDatabase,
  props<{ databaseData: Database }>()
);

export const startDatabaseAndMainCluster = createAction(
  `${DatabaseActionTypes.StartMainCluster} + ${DatabaseActionTypes.StartDatabase}`
);

export const stopDatabaseAndAllClusters = createAction(
  DatabaseActionTypes.StopDatabase
);

export const stopWorkerCluster = createAction(
  DatabaseActionTypes.StopWorkerCluster,
  props<{ targetCluster: Cluster }>()
);

export const startWorkerCluster = createAction(
  DatabaseActionTypes.StartWorkerCluster,
  props<{ targetCluster: Cluster }>()
);

export const addWorkerCluster = createAction(
  DatabaseActionTypes.AddWorkerCluster,
  props<{ workerCluster: Cluster }>()
);
