import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = []
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  get404NotFound() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
  get500ServerErrors() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
  get400BadRequest() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log(err)
        this.validationErrors = err.errors
      }
    });
  }
}
