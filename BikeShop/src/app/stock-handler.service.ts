import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class StocksHandlerService implements OnDestroy {

  stocks: any = [];
  cart: any = [];
  getStock = new BehaviorSubject<any>(this.stocks);
  getOnCartItems = new BehaviorSubject<any>(this.cart);
  constructor() { }
  setInitialData() { //to initialise data about inventory
    this.stocks = [{ "name": "Ducati Multistrada", "category": "Adventure Tourer", "available": 7, "total": 7, "isSelected": false }, { "name": "Triumph Tiger", "category": "Adventure Tourer", "available": 12, "total": 12, "isSelected": false }, { "name": "Kawasaki Versys", "category": "Adventure Tourer", "available": 15, "total": 15, "isSelected": false }, { "name": "Royal Enfield Interceptor", "category": "Tourer", "available": 20, "total": 20, "isSelected": false }, { "name": "Ducati Panigale", "category": "Super Sport", "available": 1, "total": 1, "isSelected": false }, { "name": "Yamaha R15", "category": "Sport", "available": 28, "total": 28, "isSelected": false }, { "name": "Yamaha FZ25", "category": "Street", "available": 27, "total": 27, "isSelected": false }, { "name": "Bajaj Dominar", "category": "Tourer", "available": 25, "total": 25, "isSelected": false }, { "name": "Mahindra Mojo", "category": "Tourer", "available": 24, "total": 24, "isSelected": false }, { "name": "Royal Enfield Himalayan", "category": "Adventure Tourer", "available": 25, "total": 25, "isSelected": false }, { "name": "KTM Duke 390", "category": "Street", "available": 22, "total": 22, "isSelected": false }, { "name": "KTM Duke 390 Adv", "category": "Adventure Tourer", "available": 20, "total": 20, "isSelected": false }, { "name": "Suzuki Hayabusa", "category": "Sports Tourer", "available": 10, "total": 10, "isSelected": false }, { "name": "Bajaj Pulsar 200 ns", "category": "Street", "available": 29, "total": 29, "isSelected": false }, { "name": "Honda CB 600", "category": "Sports Tourer", "available": 23, "total": 23, "isSelected": false }, { "name": "Hero Xpulse", "category": "Adventure Tourer", "available": 30, "total": 20, "isSelected": false }, { "name": "TVS Apache 310 RR", "category": "Sports", "available": 22, "total": 22, "isSelected": false }, { "name": "BMW S 1000 RR", "category": "Super Sport", "available": 3, "total": 3, "isSelected": false }, { "name": "Honda Africa Twin", "category": "Adventure Tourer", "available": 3, "total": 3, "isSelected": false }, { "name": "BMW HP4", "category": "Super Sport", "available": 1, "total": 1, "isSelected": false }];
    this.getStock.next(this.stocks);
  };

  updateCart = function (index, quantity) { // to update cart items
    this.cart[index].quantity = quantity;
    this.getOnCartItems.next(this.cart);
    for (let i = 0; i < this.cart.length; i++) {
      const element = this.cart[i];
      let relativeIndex = this.stocks.findIndex(x => x.name == element.item.name);
      if (relativeIndex !== -1)
        this.updateStocks(relativeIndex, quantity);
    }


  }
  addToCart = function (index, quantity) { //to add into cart
    let element = {
      item: this.stocks[index],
      quantity: quantity
    }
    if (this.cart.findIndex(x => x.item.name == element.item.name) == -1)
      this.cart.push(element);
    else
      this.cart[this.cart.findIndex(x => x.item.name == element.item.name)].quantity += quantity;
    this.getOnCartItems.next(this.cart);
    this.updateStocks(index, quantity, true);
  }
  removeFromCart(index) { // to remove items from cart
    let quantity = this.cart[index].quantity;
    this.cart.splice(index, 1);
    this.updateStocks(index, quantity, false);
    this.getOnCartItems.next(this.cart);
  }
  updateCartItems(data) { //update items in the cart(updating quantity)
    this.cart.length = 0;
    data.forEach(element => {
      this.cart.push(...element);
    });
    this.getOnCartItems.next(this.cart);
  }
  updateStocks = function (index, quantity, isAdd) { //internal function to update and cync up calculaltion with base data
    let element = this.stocks[index];
    if (isAdd) {
      element.available = element.available - quantity;

    }
    else if (!isAdd) {
      element.available = element.available + quantity;
    }
    else if (isAdd == undefined) {
      element.available = element.available - quantity;

    }
    this.stocks[index] = element;
    this.getStock.next(this.stocks);
  }
  updateStocksFromCart(index, element) { //to sync up stocks with the changes done in the cart
    this.stocks[index] = element;
    this.getStock.next(this.stocks);
  }

  ngOnDestroy(): void {

  }
}
