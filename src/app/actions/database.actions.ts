import { Action, createAction, props } from "@ngrx/store";
import { Database, Cluster } from "../types";

export enum DatabaseActionTypes {
  LoadDatabase = "[DB] Load Database information",
  StopDatabase = "[DB] Stop Database",
  StartDatabase = "[DB] Start Database",
  StopMainCluster = "[Main Cluster] Stop Main Cluster",
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

export const startDatabase = createAction(DatabaseActionTypes.StartDatabase);

export const stopDatabase = createAction(DatabaseActionTypes.StopDatabase);

export const stopMainCluster = createAction(
  DatabaseActionTypes.StopMainCluster
);

export const startMainCluster = createAction(
  DatabaseActionTypes.StartMainCluster
);

export const stopWorkerCluster = createAction(
  DatabaseActionTypes.StopWorkerCluster
);

export const startWorkerCluster = createAction(
  DatabaseActionTypes.StartWorkerCluster
);

export const addWorkerCluster = createAction(
  DatabaseActionTypes.AddWorkerCluster,
  props<{ workerCluster: Cluster }>()
);
