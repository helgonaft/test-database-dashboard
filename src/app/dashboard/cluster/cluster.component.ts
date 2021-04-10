import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/authentication.service";
import { Cluster } from "src/app/types";
import {
  startDatabaseAndMainCluster,
  stopDatabaseAndAllClusters,
  startWorkerCluster,
  stopWorkerCluster
} from "src/app/actions/database.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";

@Component({
  selector: "app-cluster",
  templateUrl: "./cluster.component.html",
  styleUrls: ["./cluster.component.scss"]
})
export class ClusterComponent implements OnInit {
  @Input() cluster: Cluster;
  @Input() isMain: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  get isAdmin() {
    return this.authService.isAdmin;
  }

  startCluster(cluster: Cluster) {
    if (this.isMain) {
      this.store.dispatch(startDatabaseAndMainCluster());
    } else {
      this.store.dispatch(startWorkerCluster({ targetCluster: cluster }));
    }
  }

  stopCluster(cluster: Cluster) {
    if (this.isMain) {
      this.store.dispatch(stopDatabaseAndAllClusters());
    } else {
      this.store.dispatch(stopWorkerCluster({ targetCluster: cluster }));
    }
  }
}
