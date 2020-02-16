import { Component, OnInit, OnDestroy } from '@angular/core';
import { StocksHandlerService } from '../stock-handler.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-inventory-display',
  templateUrl: './inventory-display.component.html',
  styleUrls: ['./inventory-display.component.scss']
})
export class InventoryDisplayComponent implements OnInit, OnDestroy {
  stocks = [];
  selectedQuantity: number;
  filterYexy = "";
  private subscriptions = new Subscription();
  constructor(private stockHandlerService: StocksHandlerService,
    private router: Router) {

  }
  ngOnInit() {
    this.subscriptions.add(
      this.stockHandlerService.getStock.subscribe((data) => { //retrieving all stocks
        if (data.length > 0) //check if data has initialised 
          this.stocks = data;
        else {
          this.stockHandlerService.setInitialData();//in case of first load, to initialise data
        }

      })
    );
  }

  onCartClick() { //on click of cart ,to see items in the cart
    this.router.navigateByUrl('/cart');
  }

  fetchQuantity(index) { // to fetch number of bikes that are left in stock
    var quantityArray = [];
    for (var i = 1; i <= this.stocks[index].available; i++) {
      quantityArray.push(i);
    }
    return quantityArray;
  }

  addToCart(index) { //to add a item into cart
    let selectedItem = this.stocks[index];
    this.stockHandlerService.addToCart(index, selectedItem.selectedQuantity)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
