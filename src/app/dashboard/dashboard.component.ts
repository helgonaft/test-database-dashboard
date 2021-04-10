import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatabaseService } from "../services/database.service";
import { AuthService } from "../services/authentication.service";
import { Database } from "../types/database.type";
import { AppState, selectDatabase } from "../reducers";
import {
  loadDatabase,
  stopDatabaseAndAllClusters,
  startDatabaseAndMainCluster
} from "../actions/database.actions";

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
  public error: string;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.currentUser) {
      this.router.navigate(["/login"]);
    }
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
    this.databaseService
      .getDatabaseInfo()
      .pipe(
        catchError(err => {
          this.isLoading = false;
          this.error = err.message;
          return throwError(err);
        })
      )
      .subscribe(data => {
        this.store.dispatch(loadDatabase({ databaseData: data }));
        this.isLoading = false;
        this.error = "";
      });
  }

  startDatabase(): void {
    this.store.dispatch(startDatabaseAndMainCluster());
  }

  stopDatabase(): void {
    this.store.dispatch(stopDatabaseAndAllClusters());
  }
}
