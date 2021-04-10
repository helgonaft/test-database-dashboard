import { Component, OnInit, Input } from "@angular/core";
import { Cluster } from "cluster";
import { AuthService } from "../../services/authentication.service";

@Component({
  selector: "app-cluster",
  templateUrl: "./cluster.component.html",
  styleUrls: ["./cluster.component.scss"]
})
export class ClusterComponent implements OnInit {
  @Input() cluster: Cluster;
  @Input() isMain: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  get isAdmin() {
    return this.authService.isAdmin;
  }
}
