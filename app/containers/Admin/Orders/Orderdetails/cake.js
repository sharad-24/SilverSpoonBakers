import React from 'react';
import { Chip } from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import ErrorIcon from '@material-ui/icons/Error';
import { image_url } from '../../../../config/urls';
import { formatCurrency } from '../../../../helpers/helpers';

export default function Cake(props) {
  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col-md-1 col-sm-12" style={{ textAlign: 'left' }}>
              <h1>{props.index + 1}.</h1>
            </div>
            <div className="col-md-11 col-sm-12">
              <div className="row cartContainer">
                <div className="col-md-4 col-sm-12 text-center p-3">
                  {props.product.images ? (
                    <img
                      src={image_url + props.product.images[0]}
                      className="cartImage"
                      alt={props.product.name}
                    />
                  ) : (
                    <div className="pt-5">Image not available </div>
                  )}
                </div>
                <div className="col-md-8 col-sm-12 text-center my-3">
                  <div className="row">
                    <div className="col py-2 text-left">
                      <b>{props.product.name}</b>
                    </div>
                    <div className="col py-2 text-right">
                      <Chip
                        size="small"
                        icon={
                          props.product.hasEgg ? (
                            <ErrorIcon style={{ color: 'red' }} />
                          ) : (
                            <EcoIcon style={{ color: 'green' }} />
                          )
                        }
                        label={
                          props.product.hasEgg ? <b> Egg</b> : <b> Eggless</b>
                        }
                      />
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col text-left">
                      <h>Weight</h>
                    </div>
                    <div className="col text-right">{props.product.weight}</div>
                  </div>

                  <div className="row py-1">
                    <div className="col text-left">
                      <h>Quantity:</h>
                    </div>
                    <div className="col text-right">
                      {props.product.quantity}
                    </div>
                  </div>
                  {props.product.specialInstruction ? (
                    <>
                      <div className="row py-1">
                        <div className="col text-left">
                          <h>Special Instruction:</h>
                        </div>
                        <div className="col text-right">
                          {props.product.specialInstruction}
                        </div>
                      </div>
                    </>
                  ) : null}
                  {props.product.customMessage ? (
                    <>
                      <div className="row py-1">
                        <div className="col text-left">
                          <h>Message :</h>
                        </div>
                        <div className="col text-right">
                          {props.product.customMessage}
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="row py-1">
                    <div className="col text-left">
                      <h>Flavour name:</h>
                    </div>
                    <div className="col text-right">
                      {props.product.flavour ? props.product.flavour.name : ''}
                    </div>
                  </div>
                  <div className="row py-1">
                    <div className="col text-left">
                      <h>Flavour price:</h>
                    </div>
                    <div className="col text-right">
                      {props.product.flavour ? (
                        <>{formatCurrency(props.product.flavour.price)}/KG</>
                      ) : null}
                    </div>
                  </div>
                  <hr />

                  <div className="row-md-12 row-sm-12 py-2">
                    <h6 className="pt-1">
                      Total Cost :{' '}
                      <b>
                        ₹{' '}
                        {(Number(props.product.price) +
                          Number(props.product.flavour.price)) *
                          Number(props.product.quantity) *
                          Number(props.product.weight)}
                      </b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
