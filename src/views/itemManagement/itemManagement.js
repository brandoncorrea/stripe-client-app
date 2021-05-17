import './itemManagement.css'
import ItemList from './components/itemList/itemList';
import { Link } from 'react-router-dom';

function ItemManagement() {
  return (
    <div className="ItemManagement">
      <header className="ItemManagement-header">
        <ItemList />
        <Link to="/createItem" className="btn">New Item</Link>
      </header>
    </div>
  );
}

export default ItemManagement;
