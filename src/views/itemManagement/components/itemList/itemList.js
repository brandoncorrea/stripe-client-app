import './itemList.css';
import ItemTile from '../../../../components/itemTile/itemTile';
import ProductRepository from '../../../../services/product.service';

const repo = new ProductRepository();

function ItemList() {
  
  return (
    <div className="ItemList">
      {
        repo.products.map(i => <ItemTile 
          name={i.name} 
          description={i.description} />)
      }
    </div>
  );
}

export default ItemList;
