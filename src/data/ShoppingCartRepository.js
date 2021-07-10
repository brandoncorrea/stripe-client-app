import EventEmitter from "../helpers/eventEmitter";
import { EventNames } from '../Config';

// Manages item data for the current order.
export default class ShoppingCartRepository {
  storageName = "shoppingCart";

  // Adds an item to the repository
  addItem(sku) {
    var items = this.getItemDictionary();
    if (this.isSkuInOrder(sku.id))
      items[sku.id].count++;
    else
      items[sku.id] = {
        id: sku.id,
        price: sku.price,
        product: sku.product,
        count: 1
      };
    this.setCurrentItems(items);
  }

  // Removes an item from the repository
  voidItem(skuId) {
    var items = this.getItemDictionary();
    if (this.isSkuInOrder(skuId) && items[skuId].count > 1)
      items[skuId].count--;
    else
      delete items[skuId]
    this.setCurrentItems(items);
  }

  // Sets item data to an empty dictionary
  clearAllItems = () =>
    this.setCurrentItems({ });

  // Updates the current repository
  setCurrentItems(items) {
    localStorage.setItem(
      this.storageName, 
      JSON.stringify(items));

    EventEmitter.dispatch(
      EventNames.shoppingCartItemsChanged, 
      this.getItemArray());
  }

  // Returns a dictionary with the current price object counts
  getItemDictionary() {
    var items = localStorage.getItem(this.storageName);
    if (items === null)
      return { };
    return JSON.parse(items);
  }

  // Returns the values of the storage dictionary
  getItemArray = () =>
    Object.values(this.getItemDictionary()); 

  // Returns true if there are no keys in the dictionary
  isEmpty = () =>
    this.getItemArray().length === 0;

  // Returns true if the priceId is in the current order
  isSkuInOrder(sku) {
    var items = this.getItemDictionary();
    return items[sku] && items[sku].count > 0;
  }
}