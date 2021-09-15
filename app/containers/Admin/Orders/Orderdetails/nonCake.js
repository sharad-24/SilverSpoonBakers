import React from 'react';
import { image_url } from '../../../../config/urls';
import { formatCurrency } from '../../../../helpers/helpers';

export default function NonCake(props) {
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
                  </div>

                  <div className="row py-1">
                    <div className="col text-left">
                      <h>Cost:</h>
                    </div>
                    <div className="col text-right">
                      <>{formatCurrency(props.product.price)}/item</>
                    </div>
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
                  <hr />

                  <div className="row-md-12 row-sm-12 py-2">
                    <h6 className="pt-1">
                      Total Cost :{' '}
                      <b>
                        ₹{' '}
                        {Number(props.product.price) *
                          Number(props.product.quantity)}
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
