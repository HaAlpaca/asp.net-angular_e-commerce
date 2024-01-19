import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',

  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product?: Product;
  faCartShopping = faCartShopping;
}
