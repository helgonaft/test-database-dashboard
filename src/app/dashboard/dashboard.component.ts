import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatabaseService } from "../services/database.service";
import { Database } from "../types/database.type";
import { CLUSTER_SIZES } from "../constants";
import { Store, select } from "@ngrx/store";
import { AppState, selectDatabase } from "../reducers";
import {
  loadDatabase,
  stopDatabaseAndAllClusters,
  startDatabaseAndMainCluster
} from "../actions/database.actions";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  private modalRef: any;
  public clusterSizes: string[] = CLUSTER_SIZES;
  public selectedClusterSize: string = this.clusterSizes[0];
  public database: Database;
  public database$: Observable<Database>;
  public mainClusterStatus$: Observable<string>;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getDatabaseInformation();
    this.database$ = this.store.pipe(select(selectDatabase));
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  openModal(modalTemplate): void {
    this.modalRef = this.modalService.open(modalTemplate, {
      ariaLabelledBy: "clusterModal",
      centered: true
    });
  }

  closeModal(): void {
    this.modalRef.close();
  }

  selectClusterSize(size): void {
    this.selectedClusterSize = size;
  }

  addWorkerCluster(): void {
    // TODO:  add worker cluster with selected size
    if (!this.database$) {
    }
    this.closeModal();
  }

  getDatabaseInformation() {
    this.databaseService.getDatabaseInfo().subscribe(data => {
      console.log("database: ", data);
      this.store.dispatch(loadDatabase({ databaseData: data }));
    });
  }

  startDatabase() {
    this.store.dispatch(startDatabaseAndMainCluster());
  }

  stopDatabase() {
    this.store.dispatch(stopDatabaseAndAllClusters());
  }
}
