import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  get isAdmin() {
    return this.authService.isAdmin;
  }
}
