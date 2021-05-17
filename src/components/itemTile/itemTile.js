import './itemTile.css'

function ItemTile({ name, description }) {
  return (
    <div className="ItemTile">
      <p>Name: { name }</p>
      <p>Description: { description }</p>
    </div>
  );
}

export default ItemTile;