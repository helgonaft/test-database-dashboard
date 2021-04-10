import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { CLUSTER_SIZES } from "src/app/constants";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { addWorkerCluster } from "src/app/actions/database.actions";

@Component({
  selector: "app-add-cluster-modal",
  templateUrl: "./add-cluster-modal.component.html",
  styleUrls: ["./add-cluster-modal.component.scss"]
})
export class AddClusterModalComponent implements OnInit {
  @Output()
  public onModalClose: EventEmitter<any> = new EventEmitter();

  public clusterSizes: string[] = CLUSTER_SIZES;
  public selectedClusterSize: string = this.clusterSizes[0];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  selectClusterSize(size: string): void {
    this.selectedClusterSize = size;
  }

  addWorkerCluster(): void {
    let workerCluster = {
      name: null,
      nodes: null,
      instanceType: this.selectedClusterSize,
      status: "running",
      ram: null,
      cpu: null
    };
    this.store.dispatch(addWorkerCluster({ workerCluster }));
    this.closeModal();
  }

  closeModal() {
    this.onModalClose.emit();
  }
}
