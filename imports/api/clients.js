import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Clients = new Mongo.Collection('clients');

if (Meteor.isServer) {
  Meteor.publish('client', function() {
    return Clients.find({userId: this.userId});
  });
}

Meteor.methods({
  'clients.insert' () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Clients.insert({
      userId: this.userId,
      name: '',
      address: '',
      createdAt: moment().valueOf(),
      updatedAt: null
    });
  },
  'clients.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Clients.remove({ _id, userId: this.userId });
  }
});
