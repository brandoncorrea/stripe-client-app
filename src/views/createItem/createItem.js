import './createItem.css';
import ProductRepository from '../../services/product.service';
var repo = new ProductRepository();
function CreateItem() {
  return (
    <div className="CreateItem">
      <div>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" type="text" />
      </div>

      <div>
        <label htmlFor="priceInput">Price: </label>
        <input id="priceInput" type="text" />
      </div>

      <div>
        <input type="button" value="Create" />
      </div>
    </div>
  );
}

export default CreateItem;