import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatabaseService } from "../services/database.service";
import { Database } from "../types/database.type";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  private modalRef: any;
  public clusterSizes: string[] = ["m5.large", "m5.xlarge", "m5.2xlarge"];
  public selectedClusterSize: string = this.clusterSizes[0];
  public database: Database;
  public isMainClusterStopped: boolean;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getDatabaseInformation();
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
    if (!this.isMainClusterStopped) {
      // TODO:  add worker cluster with selected size
    }
    this.closeModal();
  }

  getDatabaseInformation() {
    this.databaseService.getDatabaseInfo().subscribe(data => {
      console.log("database: ", data);
      this.database = data;
      this.isMainClusterStopped =
        this.database.mainCluster.status === "stopped";
    });
  }
}
