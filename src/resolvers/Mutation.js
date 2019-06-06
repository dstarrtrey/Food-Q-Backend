const bcrypt = require('bcryptjs');
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const { PUBSUB_NEW_WAITLIST_ITEM } = require('../shared/constants');

const Mutation = {
  async createMenuItem(parent, args, ctx, info) {
    const newMenuItem = await ctx.db.mutation.createMenuItem({
      data: {
        ...args,
      },
    }, info);
    return newMenuItem;
  },

  async createWaitlistItem(parent, args, { db, pubsub }, info) {
    const newWaitlistItem = await db.mutation.createWaitlistItem({
      data: {
        ...args,
      },
    }, info);
    pubsub.publish(PUBSUB_NEW_WAITLIST_ITEM, {
      newWaitlistItem,
    });
    // Twilio functionality

    const {
      id,
      phoneNumber,
      name,
      partySize,
    } = newWaitlistItem;
    const textUrl = `${process.env.FRONTEND_URL}/clientlist/${id}`;

    if (phoneNumber) {
      client.messages
        .create({
        // the body msg is what the text will apppear
          body: `Hello ${name}, the status of your party of ${partySize} can be
          found at: ${textUrl}`,
          // this is the # thats
          from: process.env.TWILIO_PHONE_NUMBER,
          // currently in trial mode, you can only send to reigstered phone #s
          // which is my number, call me maybe
          to: phoneNumber,
        });
    }

    return newWaitlistItem;
  },

  async removeWaitlistItem(parent, args, { db, pubsub }, info) {
    const deletedItem = await db.mutation.deleteWaitlistItem({
      where: {
        ...args,
      },
    }, info);
    pubsub.publish(PUBSUB_NEW_WAITLIST_ITEM, {
      deletedItem,
    });
    return deletedItem;
  },

  async login(parent, { username, password }, { request, db }) {
    const user = await db.query.user({
      where: {
        username,
      },
    });
    if (user) {
      if (await bcrypt.compareSync(password, user.password)) {
        request.session.user = {
          ...user,
        };
        request.session.save((err) => {
          if (err) throw new Error(err);
        });
        return true;
      }
      throw new Error('Incorrect password.');
    }
    throw new Error('No Such User exists.');
  },
  logout(parent, args, { request }) {
    delete request.session.user;
    if (!request.session.user) {
      return true;
    }
    return false;
  },
};

module.exports = Mutation;
