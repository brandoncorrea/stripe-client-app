import EventEmitter from "../helpers/eventEmitter";
import { EventNames } from '../Config';

// Manages item data for the current order.
export default class ShoppingCartRepository {
  storageName = "shoppingCart";

  // Adds an item to the repository
  addItem(price) {
    var items = this.getItemDictionary();
    if (this.isPriceInOrder(price.id))
      items[price.id].count++;
    else
      items[price.id] = {
        id: price.id,
        unit_amount: price.unit_amount,
        product: price.product,
        count: 1
      };
    this.setCurrentItems(items);
  }

  // Removes an item from the repository
  voidItem(priceId) {
    var items = this.getItemDictionary();
    if (this.isPriceInOrder(priceId) && items[priceId].count > 1)
      items[priceId].count--;
    else
      delete items[priceId]
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
  isPriceInOrder(priceId) {
    var items = this.getItemDictionary();
    return items[priceId] && items[priceId].count > 0;
  }
}