"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Action",
    embedded: false
  },
  {
    name: "ActionCategory",
    embedded: false
  },
  {
    name: "CommunityEvent",
    embedded: false
  },
  {
    name: "EventAction",
    embedded: false
  },
  {
    name: "Petition",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Schedule",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/daniel-ashcraft-a99d55/earth_guardians/dev`
});
exports.prisma = new exports.Prisma();
var models = [
  {
    name: "Action",
    embedded: false
  },
  {
    name: "ActionCategory",
    embedded: false
  },
  {
    name: "CommunityEvent",
    embedded: false
  },
  {
    name: "EventAction",
    embedded: false
  },
  {
    name: "Petition",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Schedule",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
