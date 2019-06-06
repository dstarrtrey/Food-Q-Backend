const { forwardTo } = require('prisma-binding');
const { PUBSUB_NEW_WAITLIST_ITEM } = require('../shared/constants');

// To be used for whenever someone is added or removed from waitlist

const Subscription = {
  newWaitlistItem: {
    subscribe: async (_, __, ctx) => ctx.pubsub.asyncIterator(PUBSUB_NEW_WAITLIST_ITEM),
  },
  waitlistItem: {
    subscribe: forwardTo('db'),
  },
};

module.exports = Subscription;
