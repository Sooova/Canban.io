const { AuthenticationError } = require('apollo-server-express');
const { User, Card, Workspace } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    hello: () => {
      return 'Hello World';
    },
    getAllCards: async() => {
      return await Card.find();
    },
    getWorkspaceCards: async(_parent,{workspaceID},_context,_info) => {
      return await Card.find({workspaceID: workspaceID})
    },
    getWorkspaces: async() => {
      return await Workspace.find();
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createCard: async (parent, args, context, info) => {
      const {title, state, workspaceID} = args.Card;
      const card = new Card({title, state, workspaceID})
      await card.save();
      return card
    },
    deleteCard: async (parent, args, context, info) => {
      const {id} = args;
      await Card.findByIdAndDelete(id);
      return "Post found, and deleted";
    },
    updateCard: async (parent, args, context, info) => {
      const {title, state, workspaceID} = args.Card;
      const {id} = args;
      const updates = {};
      if (title !== undefined) {
        updates.title = title
      }
      if (state !== undefined) {
        updates.state = state
      }
      if (workspaceID !== undefined) {
        updates.workspaceID = workspaceID
      }
      const card = await Card.findByIdAndUpdate(
        id,
        updates,
        { new: true}
        )
      return card;
    }
  }
};

module.exports = resolvers;
