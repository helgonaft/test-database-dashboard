import { environment } from "../../environments/environment";
import { ActionReducerMap, MetaReducer, createReducer, on } from "@ngrx/store";
import { Database } from "../types/database.type";
import * as fromDatabaseAction from "../actions/database.actions";
export interface DatabaseState {
  databaseData: Database | null;
}

const initialDatabaseState: DatabaseState = {
  databaseData: null
};

export interface AppState {
  database: DatabaseState;
}

const databaseReducer = createReducer(
  initialDatabaseState,
  on(fromDatabaseAction.loadDatabase, (state, { databaseData }) => ({
    ...state,
    databaseData
  })),
  on(fromDatabaseAction.startDatabaseAndMainCluster, state => ({
    ...state,
    databaseData: {
      ...state.databaseData,
      mainCluster: { ...state.databaseData.mainCluster, status: "running" }
    }
  })),
  on(fromDatabaseAction.stopDatabaseAndAllClusters, state => ({
    ...state,
    databaseData: {
      ...state.databaseData,
      mainCluster: { ...state.databaseData.mainCluster, status: "stopped" },
      workerClusters: state.databaseData.workerClusters
        .map(workCluster => ({ ...workCluster }))
        .map(workCluster => {
          return {
            ...workCluster,
            status: "stopped"
          };
        })
    }
  }))
);

export const reducers: ActionReducerMap<AppState> = {
  database: databaseReducer
};

export const selectDatabase = (state: AppState) => state.database.databaseData;

export const selectMainClusterStatus = (state: AppState) =>
  state.database.databaseData.mainCluster.status;

// export const selectError = (state: AppState) => state.location.error;

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
