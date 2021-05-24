import { Card, Icon } from 'semantic-ui-react'; 

export default function ProductCardStandard(props) {

  const isTrue = obj => obj && obj.toLowerCase() === "true";

  return (
    <Card.Content>
      <Card.Header content={props.product.name} />
      <Card.Meta>
        { isTrue(props.product.metadata.cafe) && <Icon name="coffee" /> }
        { isTrue(props.product.metadata.resource) && <Icon name="registered" /> }
        { isTrue(props.product.metadata.web) && <Icon name="globe" /> }
      </Card.Meta>
      <Card.Description content={props.product.description} />
    </Card.Content>
  );
}
