import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication.service";
import { User } from "../types/user.type";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  get user(): User {
    return this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
