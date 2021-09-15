import React from 'react';
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
