import React from 'react';
import { Chip } from '@material-ui/core';
import { image_url } from '../../../../config/urls';
import { formatCurrency } from '../../../../helpers/helpers';
import Cake from './cake'
import NonCake from './nonCake'

export default function OrderDetails(props) {

  if(props.product.isCake){
    return <Cake product={props.product} index={props.index}/>
  }
  else{
    return <NonCake product={props.product} index={props.index}/>
  }

}
