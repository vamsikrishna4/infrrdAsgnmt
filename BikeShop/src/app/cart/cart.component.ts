import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StocksHandlerService } from '../stock-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'category', 'quantity', 'actions'];
  dataSource;
  cartList = [];
  stocks = [];
  private subscriptions = new Subscription();
  constructor(private router: Router,
    private stockHandlerService: StocksHandlerService) { }

  ngOnInit() {
    this.subscriptions.add(
    this.stockHandlerService.getOnCartItems.subscribe((data) => {
      data.forEach(element => {
        element.isEditable = false;
        this.cartList.push(element);
      });
      this.dataSource = this.cartList;
    })
    );
    this.subscriptions.add(
    this.stockHandlerService.getStock.subscribe((data) => {
      this.stocks = data;
    })
    );
  }
  onHomeButtonClick() { //on click of home button
    this.router.navigateByUrl('/home');
  }
  onEdit(index) { // to enable edit
    this.cartList[index].isEditable = true;
  }
  onEditSubmit(index) { // to submit modified changes
    this.cartList[index].isEditable = false; //as this is confirmation to submit and disable it
    this.stockHandlerService.updateCartItems(this.cartList); //to directly update data in service
    let indexInStock = this.stocks.findIndex(x => x.name == this.cartList[index].item.name)
    let stockElement = this.stocks[indexInStock];
    // stockElement.
    stockElement.available = stockElement.total - this.cartList[index].quantity;
    this.stockHandlerService.updateStocksFromCart(indexInStock, stockElement);
  }
  removeFromCart(index) { // to remove items from the cart
    this.cartList.splice(index, 1);
    this.stockHandlerService.updateCartItems(this.cartList);
  }
  fetchQuantity(index) { // to fetch quantity of items that have been added in the cart for particular bike
    let element = this.cartList[index];
    let stockIndex = this.stocks.findIndex(x => x.name == element.item.name);

    var quantityArray = [];
    for (var i = 1; i <= this.stocks[stockIndex].selectedQuantity; i++) {
      quantityArray.push(i);
    }
    return quantityArray;
  }
  ngOnDestroy() {
this.subscriptions.unsubscribe();
  }

}
