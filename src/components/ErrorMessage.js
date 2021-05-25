import { Message } from 'semantic-ui-react';

export default function ErrorMessage(props) {
  return props.message && props.message.length > 0 
    ? <Message 
        negative
        content={props.message} />
    : <></>
}