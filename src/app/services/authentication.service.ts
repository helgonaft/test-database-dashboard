import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private userSubject: BehaviorSubject<{}>;
  public user: Observable<{}>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<{}>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    if (
      (username === "User" && password === "User123!") ||
      (username === "Admin" && password === "Admin123!")
    ) {
      localStorage.setItem("user", JSON.stringify(username));
      this.userSubject.next(username);
      return of(username);
    } else {
      return throwError("Wrong username or password");
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
