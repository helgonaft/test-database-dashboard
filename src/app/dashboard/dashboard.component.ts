import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatabaseService } from "../services/database.service";
import { Database } from "../types/database.type";
import { Store, select } from "@ngrx/store";
import { AppState, selectDatabase } from "../reducers";
import {
  loadDatabase,
  stopDatabaseAndAllClusters,
  startDatabaseAndMainCluster
} from "../actions/database.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  private modalRef: any;
  public database: Database;
  public database$: Observable<Database>;
  public isLoading: boolean;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isLoading = true;
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

  getDatabaseInformation(): void {
    this.databaseService.getDatabaseInfo().subscribe(data => {
      this.store.dispatch(loadDatabase({ databaseData: data }));
      this.isLoading = false;
    });
  }

  startDatabase(): void {
    this.store.dispatch(startDatabaseAndMainCluster());
  }

  stopDatabase(): void {
    this.store.dispatch(stopDatabaseAndAllClusters());
  }
}
