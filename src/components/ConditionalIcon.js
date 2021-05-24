import { Icon } from "semantic-ui-react";

export default function ConditionalIcon(props) {
  const isTrue = obj => obj && obj.toString().toLowerCase() === 'true';
  return isTrue(props.condition) 
    ? <Icon name={props.name} />
    : <></>;
}