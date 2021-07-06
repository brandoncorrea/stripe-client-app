import ShoppingCartRepository from "./ShoppingCartRepository";

export default class TransactionHandler {
  shoppingCart = new ShoppingCartRepository();

  getItemCount = () =>
    this.shoppingCart.getItemArray()
      .reduce((cur, price) => cur + price.count, 0);

  getOrderTotal = () => 
    (this.shoppingCart.getItemArray()
      .reduce((cur, price) => cur + price.unit_amount * price.count, 0) 
      / 100)
    .toFixed(2);
}