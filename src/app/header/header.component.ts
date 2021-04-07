import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public username: string = "User";

  logout(): void {
    // TODO: logout user and redirect to login page
    this.router.navigate(["login"]);
  }

  constructor(private router: Router) {}

  ngOnInit() {}
}
