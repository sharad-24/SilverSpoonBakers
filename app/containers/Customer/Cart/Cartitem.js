import React, { useState, useEffect } from 'react';
import Counter from '../../../components/Counter';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import EcoIcon from '@material-ui/icons/Eco';
import { Chip, IconButton, Snackbar } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import MuiAlert from '@material-ui/lab/Alert';

import { image_url } from '../../../config/urls';
import { InfoOutlined, InfoSharp } from '@material-ui/icons';
import { formatCurrency } from '../../../helpers/helpers';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CartItem = props => {
                            let [
                              count,
                              setCount,
                            ] = useState(
                              props.product.quantity,
                            );
                            const [
                              snackbar,
                              setsnackbar,
                            ] = React.useState(false);
                            const [
                              severity,
                              setseverity,
                            ] = useState('');
                            const [
                              message,
                              setMessage,
                            ] = useState('');

                            const increase = event => {
                              if (
                                count <
                                props.product
                                  .maxQuantity
                              ) {
                                setCount(
                                  (count += 1),
                                );
                                props.handleAddToCart(
                                  props.index,
                                  count,
                                );
                              } else {
                                setMessage(
                                  'Quantity limit reached',
                                );
                                setseverity('info');
                                setsnackbar(true);
                              }
                            };
                            const handleSnackBar = (
                              event,
                              reason,
                            ) => {
                              if (
                                reason === 'clickaway'
                              ) {
                                return;
                              }

                              setsnackbar(false);
                            };

                            const decrease = event => {
                              if (count <= 1) {
                                setMessage(
                                  'Min quantity is 1',
                                );
                                setseverity('info');
                                setsnackbar(true);
                                return '';
                              }
                              setCount((count -= 1));
                              props.handleAddToCart(
                                props.index,
                                count,
                              );
                            };

                            useEffect(() => {
                              checkProductValidity(
                                props.product,
                              );
                            }, []);

                            const checkProductValidity = product => {
                              const now = new Date();
                              const createdAtDate = new Date(
                                product.createdAt,
                              );
                              if (
                                createdAtDate.getTime() +
                                  172800000 <
                                now.getTime()
                              ) {
                                localStorage.removeItem(
                                  'cart',
                                );
                                return false;
                              } else {
                                return true;
                              }
                            };

                            return (
                              <>
                                <div
                                  className="col-md-1 col-sm-12"
                                  style={{
                                    textAlign: 'left',
                                  }}
                                >
                                  <h1>
                                    {props.index + 1}.
                                  </h1>
                                </div>
                                <div className="col-md-11 col-sm-12">
                                  <div className="row cartContainer">
                                    <IconButton
                                      id="x"
                                      onClick={() => {
                                        props.delete(
                                          props.index,
                                        );
                                      }}
                                    >
                                      <HighlightOffIcon />
                                    </IconButton>
                                   
                                    <div
                                      className="col-md-4 col-sm-12"
                                      style={{
                                        textAlign:
                                          'center',
                                      }}
                                    >
                                      <img
                                        src={
                                          image_url +
                                          props
                                            .product
                                            .image
                                        }
                                        className="cartImage"
                                        alt={
                                          props
                                            .product
                                            .name
                                        }
                                      />
                                    </div>
                                    <div className="col-md-4 col-sm-12 orderdetails">
                                      <div className="row">
                                        <div className="col-md-8 col-sm-12">
                                          <h6 className="pt-1">
                                            <b>
                                              {
                                                props
                                                  .product
                                                  .name
                                              }
                                            </b>
                                          </h6>
                                        </div>
                                        {props.product
                                          .isCake ? (
                                          <>
                                            <div className="col-md-4 col-sm-12">
                                              <div className="py-1 text-center">
                                                <Chip
                                                  size="small"
                                                  icon={
                                                    props
                                                      .product
                                                      .hasEgg ? (
                                                      <ErrorIcon
                                                        style={{
                                                          color:
                                                            red[500],
                                                        }}
                                                      />
                                                    ) : (
                                                      <EcoIcon
                                                        style={{
                                                          color:
                                                            green[500],
                                                        }}
                                                      />
                                                    )
                                                  }
                                                  label={
                                                    props
                                                      .product
                                                      .hasEgg ? (
                                                      <b>
                                                        Egg
                                                      </b>
                                                    ) : (
                                                      <b>
                                                        Eggless
                                                      </b>
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : null}
                                      </div>

                                      {props.product
                                        .isCake ? (
                                        <div className="pt-1">
                                          <h>
                                            Weight :{' '}
                                          </h>
                                          {
                                            props
                                              .product
                                              .weight
                                          }
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                      {props.product
                                        .isCake ? (
                                        <div className="pt-1">
                                          <h>
                                            Flavour :{' '}
                                            {
                                              props
                                                .product
                                                .flavour
                                                .name
                                            }
                                          </h>
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                      {props.product
                                        .customMessage ? (
                                        <div className="pt-1">
                                          <h>
                                            Message :{' '}
                                          </h>
                                          {
                                            props
                                              .product
                                              .customMessage
                                          }
                                        </div>
                                      ) : null}
                                      {props.product
                                        .specialInstruction ? (
                                        <div className="pt-1">
                                          <h>
                                            Special
                                            Instruction
                                            :{' '}
                                          </h>
                                          {
                                            props
                                              .product
                                              .specialInstruction
                                          }
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-4 col-sm-12 my-4 text-center">
                                          <h>
                                            Quantity:{' '}
                                          </h>
                                        </div>
                                        <div className="col-md-8 col-sm-12 my-4 text-center">
                                          <Counter
                                            increase={
                                              increase
                                            }
                                            decrease={
                                              decrease
                                            }
                                            count={
                                              count
                                            }
                                          />
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="p-2 text-center">
                                        <small>
                                          {props
                                            .product
                                            .isCake ? (
                                            <>
                                              <InfoSharp size="small" />{' '}
                                              Includes
                                              base
                                              price,
                                              flavour
                                              price &
                                              weight
                                            </>
                                          ) : (
                                            <>
                                              <InfoSharp size="small" />{' '}
                                              Price
                                              per item
                                            </>
                                          )}
                                        </small>
                                      </div>
                                      <div className="py-2 text-center">
                                        <h6>
                                          Total Cost :{' '}
                                          {props
                                            .product
                                            .isCake ? (
                                            props
                                              .product
                                              .calculatedPrice ? (
                                              <>
                                                <b>
                                                  {formatCurrency(
                                                    props
                                                      .product
                                                      .calculatedPrice,
                                                  )}
                                                </b>
                                                /item
                                              </>
                                            ) : (
                                              'Incorrect/Old price data, please delete this item and try again'
                                            )
                                          ) : (
                                            <>
                                              <b>
                                                {formatCurrency(
                                                  props
                                                    .product
                                                    .price,
                                                )}
                                              </b>
                                              /item
                                            </>
                                          )}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Snackbar
                                  open={snackbar}
                                  autoHideDuration={
                                    1500
                                  }
                                  onClose={
                                    handleSnackBar
                                  }
                                >
                                  <Alert
                                    onClose={
                                      handleSnackBar
                                    }
                                    severity={
                                      severity
                                    }
                                  >
                                    {message}
                                  </Alert>
                                </Snackbar>
                              </>
                            );
                          };

export default CartItem;
