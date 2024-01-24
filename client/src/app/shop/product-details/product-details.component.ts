import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { faCirclePlus,faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  plusIcon = faCirclePlus
  minusIcon = faCircleMinus

  product?: Product
  constructor(private shopService: ShopService,private activeRoute: ActivatedRoute,private bcSevice:BreadcrumbService) {
    this.bcSevice.set('@productDetails',' ')
  }
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if(id) this.shopService.getProduct(+id).subscribe({
      next: res =>  {
        this.product = res,
        this.bcSevice.set('@productDetails',this.product.name)
      },
      error: err => console.log(err)
    })
  }

}
