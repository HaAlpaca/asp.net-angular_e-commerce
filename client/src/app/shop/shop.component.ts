import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParam = new ShopParams()
  totalCount = 0
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(this.shopParam)
      .subscribe({
        next: (res) => {
          this.products = res.data // array
          this.shopParam.pageNumber = res.pageIndex //
          this.shopParam.pageSize = res.pageSize 
          this.totalCount = res.count
        },
        error: (err) => console.log(err),
      });
  }
  // filtering
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (res) => (this.brands = [{ id: 0, name: 'All' }, ...res]),
      error: (err) => console.log(err),
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (res) => (this.types = [{ id: 0, name: 'All' }, ...res]),
      error: (err) => console.log(err),
    });
  }
  onBrandSelected(brandId: number) {
    this.shopParam.brandId = brandId;
    this.shopParam.pageNumber = 1
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParam.typeId = typeId;
    this.shopParam.pageNumber = 1
    this.getProducts();
  }
  onSortSelected(event: any) {
    this.shopParam.sort = event.target.value
    this.getProducts()
  }
  onPageChanged(event: any) {
    if(this.shopParam.pageNumber !== event) {
      this.shopParam.pageNumber = event
      this.getProducts()
    }
  }
  onSearch() {
    this.shopParam.search = this.searchTerm?.nativeElement.value
    this.getProducts()
  }
  onReset() {
    if(this.searchTerm)  this.searchTerm.nativeElement.value =''
    this.shopParam = new ShopParams()
    this.getProducts()
  }
}
