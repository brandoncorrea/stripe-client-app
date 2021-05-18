import './itemManagement.css'
import ItemList from './components/itemList/itemList';
import { Link } from 'react-router-dom';
import React from 'react';

export default class ItemManagement extends React.Component {  
  render = () =>
    <div className="ItemManagement">
      <header className="ItemManagement-header">
        <ItemList />
        <Link to="/createItem" className="btn">New Item</Link>
      </header>
    </div>;
}
