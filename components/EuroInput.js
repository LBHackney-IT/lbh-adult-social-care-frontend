import React from 'react';
import Input from './Input';
import { currency } from '../constants/strings';

const EuroInput = (props) => {
  const lessNull = props.value < 0;
  const minusPreSign = lessNull ? '-' : '';
  return <Input preSign={`${minusPreSign}${currency.euro}`} {...props} value={props.value < 0 ? -props.value : props.value} onChange={(value) => {
    if(lessNull) {
      if(Math.abs(props.value) === value || value !== '') {
        props.onChange(-value);
      } else {
        props.onChange(value);
      }
    } else {
      props.onChange(value);
    }
  }} />;
}

export default EuroInput;
