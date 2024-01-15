import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Shopping';
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Pagination<Product[]>>(
        'http://localhost:5001/api/products?pageSize=50'
      )
      .subscribe({
        next: (res: any) => (this.products = res.data),
        error: (err) => console.log(err),
        complete: () => {
          console.log('reqested completed');
          console.log('extra statements');
        },
      });
  }
}
