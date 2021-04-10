import { Injectable } from "@angular/core";
import { Database } from "../types/database.type";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_SERVER, API_KEY } from "../api/api";

@Injectable({ providedIn: "root" })
export class DatabaseService {
  constructor(private httpClient: HttpClient) {}

  public getDatabaseInfo(): Observable<Database> {
    return this.httpClient.get<Database>(`${API_SERVER}/database`, {
      headers: new HttpHeaders().set("x-api-key", API_KEY),
      observe: "body"
    });
  }
}
