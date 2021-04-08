import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { User } from "../types/user.type";

@Injectable({ providedIn: "root" })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  public get isAdmin(): boolean {
    return this.userSubject.value.isAdmin;
  }

  login(username: string, password: string) {
    if (username === "User" && password === "User123!") {
      localStorage.setItem("user", JSON.stringify(username));
      this.userSubject.next({
        name: username,
        isAdmin: false
      });
      return of(username);
    }
    if (username === "Admin" && password === "Admin123!") {
      localStorage.setItem("user", JSON.stringify(username));
      this.userSubject.next({
        name: username,
        isAdmin: true
      });
      return of(username);
    }
    return throwError("Wrong username or password");
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
