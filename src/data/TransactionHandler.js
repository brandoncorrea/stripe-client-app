import ShoppingCartRepository from "./ShoppingCartRepository";

export default class TransactionHandler {
  shoppingCart = new ShoppingCartRepository();

  getItemCount = () =>
    this.shoppingCart.getItemArray()
      .reduce((cur, sku) => cur + sku.count, 0);

  getOrderTotal = () => 
    Number((this.shoppingCart.getItemArray()
      .reduce((cur, sku) => cur + sku.price * sku.count, 0) 
      / 100)
    .toFixed(2));

  void = () =>
    this.shoppingCart.clearAllItems();
}