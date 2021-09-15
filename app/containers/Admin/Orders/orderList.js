import React from 'react';
import {
  Divider,
  Container,
 
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import OrderItem from './orderItem';
import './admin-order.css';

export default function OrderList(props) {
  return (
    <>
      <Container>
        <div className="container p-3">
          <div className="mx-2">
            <Button
              variant="contained"
              style={{ boxShadow: 'none', borderRadius: '0' }}
            >
              Filter by :
            </Button>
          </div>
          <div className="mx-2">
            <Button
              onClick={props.getUpcomingOrders}
              variant="contained"
              style={{ backgroundColor: 'yellow' }}
            >
              Upcoming
            </Button>
          </div>
          <div className="mx-2">
            <Button
              onClick={props.getDeliveredOrders}
              variant="contained"
              style={{ backgroundColor: 'lightgreen' }}
            >
              Delivered
            </Button>
          </div>
          <div className="mx-2">
            <Button
              onClick={props.getCancelledOrders}
              variant="contained"
              style={{ backgroundColor: 'orange' }}
            >
              Cancelled
            </Button>
          </div>
          <div className="mx-2">
            <Button
              onClick={props.getPaymentPendingOrders}
              variant="contained"
              style={{ backgroundColor: 'cyan' }}
            >
              Payment Pending
            </Button>
          </div>
        </div>
        <div className="container">
          <div>Viewing : {props.orderType} orders</div>
        </div>
        <div className="container">
          <div className="row">
            {props.orders ? (
              props.orders.length > 0 ? (
                props.orders.length > 2 ? (
                  props.orders.map((order, index) => {
                    return (
                      <div className="col-md-4 col-sm-12 my-3">
                        <Card
                          className="cardOrder"
                          style={{
                            borderRadius: '20px',
                          }}
                        >
                          <OrderItem index={index} key={index} order={order} />
                        </Card>
                      </div>
                    );
                  })
                ) : (
                  props.orders.map((order, index) => {
                    return (
                      <div className="col-md-4 col-sm-12 my-3">
                        <Card
                          className="cardOrder"
                          style={{
                            borderRadius: '20px',
                            width: '300px',
                          }}
                        >
                          <OrderItem index={index} key={index} order={order} />
                        </Card>
                      </div>
                    );
                  })
                )
              ) : (
                <div className="row text-center text-muted">
                  No orders yet! <br />
                </div>
              )
            ) : (
              <div className="row text-center text-muted">
                Fetching Orders... <br />
              </div>
            )}
          </div>
        </div>
        <Divider />
      </Container>
    </>
  );
}
