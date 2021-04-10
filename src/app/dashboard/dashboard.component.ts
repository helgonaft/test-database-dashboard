import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  private modalRef: any;
  public selectedClusterSize: string = "m5.xlarge";
  public clusterSizes: string[] = [];

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

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
    this.selectClusterSize = size;
  }
}
