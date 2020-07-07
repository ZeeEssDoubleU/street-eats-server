"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// *** load stripe api key and initiate stripe connection
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// TODO: consider moving stripe methods to their own services

// ******************
// create payment intent
// ******************
const create = async (ctx) => {
  const dishes = ctx.request.body;
  // console.log("ctx.request.body:", ctx.request.body); // ? debug

  const amount = strapi.services.order.dishes_calcCost(dishes);

  try {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });
    console.log("creating payment intent...");

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error(error);
  }
};

// ******************
// get payment intent (possibly update)
// ******************
const retrieve = async (ctx) => {
  const { paymentIntent_id, items: dishes } = ctx.request.body;
  // console.log("ctx.request.body:", ctx.request.body); // ? debug

  const amount = strapi.services.order.dishes_calcCost(dishes);

  try {
    // retrieve payment intent
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent_id);
    console.log("retrieving payment intent...");

    // if current cart $ amount differs from retrieved $ amount, update payment intent
    if (paymentIntent.amount !== amount) {
      paymentIntent = await stripe.paymentIntents.update(paymentIntent_id, {
        amount,
      });
      console.log("updating payment intent...");
    }

    return { id: paymentIntent.id, client_secret: paymentIntent.client_secret };
  } catch (error) {
    console.error(error);
  }
};

// ******************
// confirm payment intent
// ******************

// TODO: will payment_intent confirmation move to back end (here) at later date...maybe...

module.exports = {
  create,
  retrieve,
};
