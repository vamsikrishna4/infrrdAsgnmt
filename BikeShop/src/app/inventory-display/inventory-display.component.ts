import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StocksHandlerService } from '../stock-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory-display',
  templateUrl: './inventory-display.component.html',
  styleUrls: ['./inventory-display.component.scss']
})
export class InventoryDisplayComponent implements OnInit, AfterViewInit {
  stocks = [];
  selectedQuantity: number;
  filterYexy = "";
  constructor(private stockHandlerService: StocksHandlerService,
    private router: Router) {

  }
  ngOnInit() {
    this.stockHandlerService.getStock.subscribe((data) => {
      if (data.length > 0)
        this.stocks = data;
      else {
        this.stockHandlerService.setInitialData();
      }

    });
    // });
  }
  ngAfterViewInit() {

  }
  onCartClick() {
    this.router.navigateByUrl('/cart');
  }

  fetchQuantity(index) {
    var quantityArray = [];
    for (var i = 1; i <= this.stocks[index].available; i++) {
      quantityArray.push(i);
    }
    return quantityArray;
  }

  addToCart(index) {
    let selectedItem = this.stocks[index];
    this.stockHandlerService.addToCart(index, selectedItem.selectedQuantity)
  }

}
