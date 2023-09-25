import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-football-matches",
  templateUrl: "./football-matches.component.html",
  styleUrls: ["./football-matches.component.scss"],
})
export class FootballMatchesComponent implements OnInit {
  years: number[] = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  selectedYear: number;
  responseData: Competition[];
  totalMatches: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onYearClick(year) {
    this.selectedYear = year;
    this.responseData = [];
    this.totalMatches = 0;
    this.http
      .get(
        `https://jsonmock.hackerrank.com/api/football_competitions?year=${this.selectedYear}`
      )
      .subscribe((res: ApiResponse) => {
        this.responseData = res.data;
        this.totalMatches = res.data.length;
      });
  }
}
export interface Match {
  name: string;
  winner: string;
}

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}
interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}
