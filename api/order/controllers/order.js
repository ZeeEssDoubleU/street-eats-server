"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// ******************
// create order
// ******************

module.exports = {
  create: async (ctx) => {
    const { user, paymentInfo, transaction_id, cart } = ctx.request.body;
    // console.log("transaction_id - create order:", transaction_id); // ? debug

    const { id: user_id, username } = user;
    const { name, address, city, state, postal_code } = paymentInfo;
    const { id: restaurant_id, name: restaurant_name, items: dishes } = cart;

    // calc cost of items
    const amount = strapi.services.order.dishes_calcCost(dishes);

    // console.log("user:", user); // ? debug
    // console.log("paymentInfo:", paymentInfo); // ? debug
    // console.log("cart:", cart); // ? debug
    // console.log("amount:", amount); // ? debug

    try {
      const entity = await strapi.services.order.create({
        user: user_id,
        name,
        address,
        city,
        state,
        postal_code,
        restaurant: restaurant_id,
        dishes,
        amount,
        transaction_id,
      });

      return sanitizeEntity(entity, { model: strapi.models.order });
    } catch (error) {
      console.error(error);
    }
  },
};
