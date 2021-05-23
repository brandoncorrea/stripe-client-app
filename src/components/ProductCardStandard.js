import { Card, Button } from 'semantic-ui-react'; 

export default function ProductCardStandard(props) {
  return (
    <Card.Content>
      <Button 
        floated='right'
        content='Edit'
        onClick={() => props.onEdit && props.onEdit()} />

      <Card.Header content={props.product.name} />
      <Card.Meta content={'$' + (props.price.unit_amount / 100).toFixed(2)} />
      <Card.Description content={props.product.description} />
    </Card.Content>
  );
}