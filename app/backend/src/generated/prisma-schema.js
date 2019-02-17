module.exports = {
        typeDefs: /* GraphQL */ `type Action {
  id: ID!
  category: ActionCategory
  primary_image: String
  active: Boolean
  short_description: String!
  action_taken_description: String!
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean!
  related_actions(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Action!]
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ActionCategory {
  id: ID!
  name: String!
  actions(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Action!]
  primary_image: String
  video_id: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ActionCategoryConnection {
  pageInfo: PageInfo!
  edges: [ActionCategoryEdge]!
  aggregate: AggregateActionCategory!
}

input ActionCategoryCreateInput {
  name: String!
  actions: ActionCreateManyWithoutCategoryInput
  primary_image: String
  video_id: String
}

input ActionCategoryCreateOneWithoutActionsInput {
  create: ActionCategoryCreateWithoutActionsInput
  connect: ActionCategoryWhereUniqueInput
}

input ActionCategoryCreateWithoutActionsInput {
  name: String!
  primary_image: String
  video_id: String
}

type ActionCategoryEdge {
  node: ActionCategory!
  cursor: String!
}

enum ActionCategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  primary_image_ASC
  primary_image_DESC
  video_id_ASC
  video_id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionCategoryPreviousValues {
  id: ID!
  name: String!
  primary_image: String
  video_id: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ActionCategorySubscriptionPayload {
  mutation: MutationType!
  node: ActionCategory
  updatedFields: [String!]
  previousValues: ActionCategoryPreviousValues
}

input ActionCategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionCategoryWhereInput
  AND: [ActionCategorySubscriptionWhereInput!]
  OR: [ActionCategorySubscriptionWhereInput!]
  NOT: [ActionCategorySubscriptionWhereInput!]
}

input ActionCategoryUpdateInput {
  name: String
  actions: ActionUpdateManyWithoutCategoryInput
  primary_image: String
  video_id: String
}

input ActionCategoryUpdateManyMutationInput {
  name: String
  primary_image: String
  video_id: String
}

input ActionCategoryUpdateOneWithoutActionsInput {
  create: ActionCategoryCreateWithoutActionsInput
  update: ActionCategoryUpdateWithoutActionsDataInput
  upsert: ActionCategoryUpsertWithoutActionsInput
  delete: Boolean
  disconnect: Boolean
  connect: ActionCategoryWhereUniqueInput
}

input ActionCategoryUpdateWithoutActionsDataInput {
  name: String
  primary_image: String
  video_id: String
}

input ActionCategoryUpsertWithoutActionsInput {
  update: ActionCategoryUpdateWithoutActionsDataInput!
  create: ActionCategoryCreateWithoutActionsInput!
}

input ActionCategoryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  actions_every: ActionWhereInput
  actions_some: ActionWhereInput
  actions_none: ActionWhereInput
  primary_image: String
  primary_image_not: String
  primary_image_in: [String!]
  primary_image_not_in: [String!]
  primary_image_lt: String
  primary_image_lte: String
  primary_image_gt: String
  primary_image_gte: String
  primary_image_contains: String
  primary_image_not_contains: String
  primary_image_starts_with: String
  primary_image_not_starts_with: String
  primary_image_ends_with: String
  primary_image_not_ends_with: String
  video_id: String
  video_id_not: String
  video_id_in: [String!]
  video_id_not_in: [String!]
  video_id_lt: String
  video_id_lte: String
  video_id_gt: String
  video_id_gte: String
  video_id_contains: String
  video_id_not_contains: String
  video_id_starts_with: String
  video_id_not_starts_with: String
  video_id_ends_with: String
  video_id_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ActionCategoryWhereInput!]
  OR: [ActionCategoryWhereInput!]
  NOT: [ActionCategoryWhereInput!]
}

input ActionCategoryWhereUniqueInput {
  id: ID
}

type ActionConnection {
  pageInfo: PageInfo!
  edges: [ActionEdge]!
  aggregate: AggregateAction!
}

input ActionCreateInput {
  category: ActionCategoryCreateOneWithoutActionsInput
  primary_image: String
  active: Boolean
  short_description: String!
  action_taken_description: String!
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
  related_actions: ActionCreateManyInput
  author: UserCreateOneInput!
}

input ActionCreateManyInput {
  create: [ActionCreateInput!]
  connect: [ActionWhereUniqueInput!]
}

input ActionCreateManyWithoutCategoryInput {
  create: [ActionCreateWithoutCategoryInput!]
  connect: [ActionWhereUniqueInput!]
}

input ActionCreateOneInput {
  create: ActionCreateInput
  connect: ActionWhereUniqueInput
}

input ActionCreateWithoutCategoryInput {
  primary_image: String
  active: Boolean
  short_description: String!
  action_taken_description: String!
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
  related_actions: ActionCreateManyInput
  author: UserCreateOneInput!
}

type ActionEdge {
  node: Action!
  cursor: String!
}

enum ActionOrderByInput {
  id_ASC
  id_DESC
  primary_image_ASC
  primary_image_DESC
  active_ASC
  active_DESC
  short_description_ASC
  short_description_DESC
  action_taken_description_ASC
  action_taken_description_DESC
  schedule_ASC
  schedule_DESC
  video_url_ASC
  video_url_DESC
  carbon_dioxide_ASC
  carbon_dioxide_DESC
  order_ASC
  order_DESC
  water_ASC
  water_DESC
  waste_ASC
  waste_DESC
  points_ASC
  points_DESC
  external_url_ASC
  external_url_DESC
  isGame_ASC
  isGame_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionPreviousValues {
  id: ID!
  primary_image: String
  active: Boolean
  short_description: String!
  action_taken_description: String!
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input ActionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  primary_image: String
  primary_image_not: String
  primary_image_in: [String!]
  primary_image_not_in: [String!]
  primary_image_lt: String
  primary_image_lte: String
  primary_image_gt: String
  primary_image_gte: String
  primary_image_contains: String
  primary_image_not_contains: String
  primary_image_starts_with: String
  primary_image_not_starts_with: String
  primary_image_ends_with: String
  primary_image_not_ends_with: String
  active: Boolean
  active_not: Boolean
  short_description: String
  short_description_not: String
  short_description_in: [String!]
  short_description_not_in: [String!]
  short_description_lt: String
  short_description_lte: String
  short_description_gt: String
  short_description_gte: String
  short_description_contains: String
  short_description_not_contains: String
  short_description_starts_with: String
  short_description_not_starts_with: String
  short_description_ends_with: String
  short_description_not_ends_with: String
  action_taken_description: String
  action_taken_description_not: String
  action_taken_description_in: [String!]
  action_taken_description_not_in: [String!]
  action_taken_description_lt: String
  action_taken_description_lte: String
  action_taken_description_gt: String
  action_taken_description_gte: String
  action_taken_description_contains: String
  action_taken_description_not_contains: String
  action_taken_description_starts_with: String
  action_taken_description_not_starts_with: String
  action_taken_description_ends_with: String
  action_taken_description_not_ends_with: String
  schedule: Schedule
  schedule_not: Schedule
  schedule_in: [Schedule!]
  schedule_not_in: [Schedule!]
  video_url: String
  video_url_not: String
  video_url_in: [String!]
  video_url_not_in: [String!]
  video_url_lt: String
  video_url_lte: String
  video_url_gt: String
  video_url_gte: String
  video_url_contains: String
  video_url_not_contains: String
  video_url_starts_with: String
  video_url_not_starts_with: String
  video_url_ends_with: String
  video_url_not_ends_with: String
  carbon_dioxide: Float
  carbon_dioxide_not: Float
  carbon_dioxide_in: [Float!]
  carbon_dioxide_not_in: [Float!]
  carbon_dioxide_lt: Float
  carbon_dioxide_lte: Float
  carbon_dioxide_gt: Float
  carbon_dioxide_gte: Float
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  water: Float
  water_not: Float
  water_in: [Float!]
  water_not_in: [Float!]
  water_lt: Float
  water_lte: Float
  water_gt: Float
  water_gte: Float
  waste: Float
  waste_not: Float
  waste_in: [Float!]
  waste_not_in: [Float!]
  waste_lt: Float
  waste_lte: Float
  waste_gt: Float
  waste_gte: Float
  points: Int
  points_not: Int
  points_in: [Int!]
  points_not_in: [Int!]
  points_lt: Int
  points_lte: Int
  points_gt: Int
  points_gte: Int
  external_url: String
  external_url_not: String
  external_url_in: [String!]
  external_url_not_in: [String!]
  external_url_lt: String
  external_url_lte: String
  external_url_gt: String
  external_url_gte: String
  external_url_contains: String
  external_url_not_contains: String
  external_url_starts_with: String
  external_url_not_starts_with: String
  external_url_ends_with: String
  external_url_not_ends_with: String
  isGame: Boolean
  isGame_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ActionScalarWhereInput!]
  OR: [ActionScalarWhereInput!]
  NOT: [ActionScalarWhereInput!]
}

type ActionSubscriptionPayload {
  mutation: MutationType!
  node: Action
  updatedFields: [String!]
  previousValues: ActionPreviousValues
}

input ActionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionWhereInput
  AND: [ActionSubscriptionWhereInput!]
  OR: [ActionSubscriptionWhereInput!]
  NOT: [ActionSubscriptionWhereInput!]
}

input ActionUpdateDataInput {
  category: ActionCategoryUpdateOneWithoutActionsInput
  primary_image: String
  active: Boolean
  short_description: String
  action_taken_description: String
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
  related_actions: ActionUpdateManyInput
  author: UserUpdateOneRequiredInput
}

input ActionUpdateInput {
  category: ActionCategoryUpdateOneWithoutActionsInput
  primary_image: String
  active: Boolean
  short_description: String
  action_taken_description: String
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
  related_actions: ActionUpdateManyInput
  author: UserUpdateOneRequiredInput
}

input ActionUpdateManyDataInput {
  primary_image: String
  active: Boolean
  short_description: String
  action_taken_description: String
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
}

input ActionUpdateManyInput {
  create: [ActionCreateInput!]
  update: [ActionUpdateWithWhereUniqueNestedInput!]
  upsert: [ActionUpsertWithWhereUniqueNestedInput!]
  delete: [ActionWhereUniqueInput!]
  connect: [ActionWhereUniqueInput!]
  disconnect: [ActionWhereUniqueInput!]
  deleteMany: [ActionScalarWhereInput!]
  updateMany: [ActionUpdateManyWithWhereNestedInput!]
}

input ActionUpdateManyMutationInput {
  primary_image: String
  active: Boolean
  short_description: String
  action_taken_description: String
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
}

input ActionUpdateManyWithoutCategoryInput {
  create: [ActionCreateWithoutCategoryInput!]
  delete: [ActionWhereUniqueInput!]
  connect: [ActionWhereUniqueInput!]
  disconnect: [ActionWhereUniqueInput!]
  update: [ActionUpdateWithWhereUniqueWithoutCategoryInput!]
  upsert: [ActionUpsertWithWhereUniqueWithoutCategoryInput!]
  deleteMany: [ActionScalarWhereInput!]
  updateMany: [ActionUpdateManyWithWhereNestedInput!]
}

input ActionUpdateManyWithWhereNestedInput {
  where: ActionScalarWhereInput!
  data: ActionUpdateManyDataInput!
}

input ActionUpdateOneRequiredInput {
  create: ActionCreateInput
  update: ActionUpdateDataInput
  upsert: ActionUpsertNestedInput
  connect: ActionWhereUniqueInput
}

input ActionUpdateWithoutCategoryDataInput {
  primary_image: String
  active: Boolean
  short_description: String
  action_taken_description: String
  schedule: Schedule
  video_url: String
  carbon_dioxide: Float
  order: Int
  water: Float
  waste: Float
  points: Int
  external_url: String
  isGame: Boolean
  related_actions: ActionUpdateManyInput
  author: UserUpdateOneRequiredInput
}

input ActionUpdateWithWhereUniqueNestedInput {
  where: ActionWhereUniqueInput!
  data: ActionUpdateDataInput!
}

input ActionUpdateWithWhereUniqueWithoutCategoryInput {
  where: ActionWhereUniqueInput!
  data: ActionUpdateWithoutCategoryDataInput!
}

input ActionUpsertNestedInput {
  update: ActionUpdateDataInput!
  create: ActionCreateInput!
}

input ActionUpsertWithWhereUniqueNestedInput {
  where: ActionWhereUniqueInput!
  update: ActionUpdateDataInput!
  create: ActionCreateInput!
}

input ActionUpsertWithWhereUniqueWithoutCategoryInput {
  where: ActionWhereUniqueInput!
  update: ActionUpdateWithoutCategoryDataInput!
  create: ActionCreateWithoutCategoryInput!
}

input ActionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  category: ActionCategoryWhereInput
  primary_image: String
  primary_image_not: String
  primary_image_in: [String!]
  primary_image_not_in: [String!]
  primary_image_lt: String
  primary_image_lte: String
  primary_image_gt: String
  primary_image_gte: String
  primary_image_contains: String
  primary_image_not_contains: String
  primary_image_starts_with: String
  primary_image_not_starts_with: String
  primary_image_ends_with: String
  primary_image_not_ends_with: String
  active: Boolean
  active_not: Boolean
  short_description: String
  short_description_not: String
  short_description_in: [String!]
  short_description_not_in: [String!]
  short_description_lt: String
  short_description_lte: String
  short_description_gt: String
  short_description_gte: String
  short_description_contains: String
  short_description_not_contains: String
  short_description_starts_with: String
  short_description_not_starts_with: String
  short_description_ends_with: String
  short_description_not_ends_with: String
  action_taken_description: String
  action_taken_description_not: String
  action_taken_description_in: [String!]
  action_taken_description_not_in: [String!]
  action_taken_description_lt: String
  action_taken_description_lte: String
  action_taken_description_gt: String
  action_taken_description_gte: String
  action_taken_description_contains: String
  action_taken_description_not_contains: String
  action_taken_description_starts_with: String
  action_taken_description_not_starts_with: String
  action_taken_description_ends_with: String
  action_taken_description_not_ends_with: String
  schedule: Schedule
  schedule_not: Schedule
  schedule_in: [Schedule!]
  schedule_not_in: [Schedule!]
  video_url: String
  video_url_not: String
  video_url_in: [String!]
  video_url_not_in: [String!]
  video_url_lt: String
  video_url_lte: String
  video_url_gt: String
  video_url_gte: String
  video_url_contains: String
  video_url_not_contains: String
  video_url_starts_with: String
  video_url_not_starts_with: String
  video_url_ends_with: String
  video_url_not_ends_with: String
  carbon_dioxide: Float
  carbon_dioxide_not: Float
  carbon_dioxide_in: [Float!]
  carbon_dioxide_not_in: [Float!]
  carbon_dioxide_lt: Float
  carbon_dioxide_lte: Float
  carbon_dioxide_gt: Float
  carbon_dioxide_gte: Float
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  water: Float
  water_not: Float
  water_in: [Float!]
  water_not_in: [Float!]
  water_lt: Float
  water_lte: Float
  water_gt: Float
  water_gte: Float
  waste: Float
  waste_not: Float
  waste_in: [Float!]
  waste_not_in: [Float!]
  waste_lt: Float
  waste_lte: Float
  waste_gt: Float
  waste_gte: Float
  points: Int
  points_not: Int
  points_in: [Int!]
  points_not_in: [Int!]
  points_lt: Int
  points_lte: Int
  points_gt: Int
  points_gte: Int
  external_url: String
  external_url_not: String
  external_url_in: [String!]
  external_url_not_in: [String!]
  external_url_lt: String
  external_url_lte: String
  external_url_gt: String
  external_url_gte: String
  external_url_contains: String
  external_url_not_contains: String
  external_url_starts_with: String
  external_url_not_starts_with: String
  external_url_ends_with: String
  external_url_not_ends_with: String
  isGame: Boolean
  isGame_not: Boolean
  related_actions_every: ActionWhereInput
  related_actions_some: ActionWhereInput
  related_actions_none: ActionWhereInput
  author: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ActionWhereInput!]
  OR: [ActionWhereInput!]
  NOT: [ActionWhereInput!]
}

input ActionWhereUniqueInput {
  id: ID
}

type AggregateAction {
  count: Int!
}

type AggregateActionCategory {
  count: Int!
}

type AggregateCommunityEvent {
  count: Int!
}

type AggregateEventAction {
  count: Int!
}

type AggregatePetition {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type CommunityEvent {
  id: ID!
  type: String!
  number_of_people: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type CommunityEventConnection {
  pageInfo: PageInfo!
  edges: [CommunityEventEdge]!
  aggregate: AggregateCommunityEvent!
}

input CommunityEventCreateInput {
  type: String!
  number_of_people: Int!
}

input CommunityEventCreateManyInput {
  create: [CommunityEventCreateInput!]
  connect: [CommunityEventWhereUniqueInput!]
}

type CommunityEventEdge {
  node: CommunityEvent!
  cursor: String!
}

enum CommunityEventOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  number_of_people_ASC
  number_of_people_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommunityEventPreviousValues {
  id: ID!
  type: String!
  number_of_people: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input CommunityEventScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  number_of_people: Int
  number_of_people_not: Int
  number_of_people_in: [Int!]
  number_of_people_not_in: [Int!]
  number_of_people_lt: Int
  number_of_people_lte: Int
  number_of_people_gt: Int
  number_of_people_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [CommunityEventScalarWhereInput!]
  OR: [CommunityEventScalarWhereInput!]
  NOT: [CommunityEventScalarWhereInput!]
}

type CommunityEventSubscriptionPayload {
  mutation: MutationType!
  node: CommunityEvent
  updatedFields: [String!]
  previousValues: CommunityEventPreviousValues
}

input CommunityEventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommunityEventWhereInput
  AND: [CommunityEventSubscriptionWhereInput!]
  OR: [CommunityEventSubscriptionWhereInput!]
  NOT: [CommunityEventSubscriptionWhereInput!]
}

input CommunityEventUpdateDataInput {
  type: String
  number_of_people: Int
}

input CommunityEventUpdateInput {
  type: String
  number_of_people: Int
}

input CommunityEventUpdateManyDataInput {
  type: String
  number_of_people: Int
}

input CommunityEventUpdateManyInput {
  create: [CommunityEventCreateInput!]
  update: [CommunityEventUpdateWithWhereUniqueNestedInput!]
  upsert: [CommunityEventUpsertWithWhereUniqueNestedInput!]
  delete: [CommunityEventWhereUniqueInput!]
  connect: [CommunityEventWhereUniqueInput!]
  disconnect: [CommunityEventWhereUniqueInput!]
  deleteMany: [CommunityEventScalarWhereInput!]
  updateMany: [CommunityEventUpdateManyWithWhereNestedInput!]
}

input CommunityEventUpdateManyMutationInput {
  type: String
  number_of_people: Int
}

input CommunityEventUpdateManyWithWhereNestedInput {
  where: CommunityEventScalarWhereInput!
  data: CommunityEventUpdateManyDataInput!
}

input CommunityEventUpdateWithWhereUniqueNestedInput {
  where: CommunityEventWhereUniqueInput!
  data: CommunityEventUpdateDataInput!
}

input CommunityEventUpsertWithWhereUniqueNestedInput {
  where: CommunityEventWhereUniqueInput!
  update: CommunityEventUpdateDataInput!
  create: CommunityEventCreateInput!
}

input CommunityEventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  number_of_people: Int
  number_of_people_not: Int
  number_of_people_in: [Int!]
  number_of_people_not_in: [Int!]
  number_of_people_lt: Int
  number_of_people_lte: Int
  number_of_people_gt: Int
  number_of_people_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [CommunityEventWhereInput!]
  OR: [CommunityEventWhereInput!]
  NOT: [CommunityEventWhereInput!]
}

input CommunityEventWhereUniqueInput {
  id: ID
}

scalar DateTime

type EventAction {
  id: ID!
  action: Action!
  user: User!
  took_action: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EventActionConnection {
  pageInfo: PageInfo!
  edges: [EventActionEdge]!
  aggregate: AggregateEventAction!
}

input EventActionCreateInput {
  action: ActionCreateOneInput!
  user: UserCreateOneWithoutRecent_actionsInput!
  took_action: Boolean
}

input EventActionCreateManyWithoutUserInput {
  create: [EventActionCreateWithoutUserInput!]
  connect: [EventActionWhereUniqueInput!]
}

input EventActionCreateWithoutUserInput {
  action: ActionCreateOneInput!
  took_action: Boolean
}

type EventActionEdge {
  node: EventAction!
  cursor: String!
}

enum EventActionOrderByInput {
  id_ASC
  id_DESC
  took_action_ASC
  took_action_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EventActionPreviousValues {
  id: ID!
  took_action: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input EventActionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  took_action: Boolean
  took_action_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [EventActionScalarWhereInput!]
  OR: [EventActionScalarWhereInput!]
  NOT: [EventActionScalarWhereInput!]
}

type EventActionSubscriptionPayload {
  mutation: MutationType!
  node: EventAction
  updatedFields: [String!]
  previousValues: EventActionPreviousValues
}

input EventActionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventActionWhereInput
  AND: [EventActionSubscriptionWhereInput!]
  OR: [EventActionSubscriptionWhereInput!]
  NOT: [EventActionSubscriptionWhereInput!]
}

input EventActionUpdateInput {
  action: ActionUpdateOneRequiredInput
  user: UserUpdateOneRequiredWithoutRecent_actionsInput
  took_action: Boolean
}

input EventActionUpdateManyDataInput {
  took_action: Boolean
}

input EventActionUpdateManyMutationInput {
  took_action: Boolean
}

input EventActionUpdateManyWithoutUserInput {
  create: [EventActionCreateWithoutUserInput!]
  delete: [EventActionWhereUniqueInput!]
  connect: [EventActionWhereUniqueInput!]
  disconnect: [EventActionWhereUniqueInput!]
  update: [EventActionUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [EventActionUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [EventActionScalarWhereInput!]
  updateMany: [EventActionUpdateManyWithWhereNestedInput!]
}

input EventActionUpdateManyWithWhereNestedInput {
  where: EventActionScalarWhereInput!
  data: EventActionUpdateManyDataInput!
}

input EventActionUpdateWithoutUserDataInput {
  action: ActionUpdateOneRequiredInput
  took_action: Boolean
}

input EventActionUpdateWithWhereUniqueWithoutUserInput {
  where: EventActionWhereUniqueInput!
  data: EventActionUpdateWithoutUserDataInput!
}

input EventActionUpsertWithWhereUniqueWithoutUserInput {
  where: EventActionWhereUniqueInput!
  update: EventActionUpdateWithoutUserDataInput!
  create: EventActionCreateWithoutUserInput!
}

input EventActionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  action: ActionWhereInput
  user: UserWhereInput
  took_action: Boolean
  took_action_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [EventActionWhereInput!]
  OR: [EventActionWhereInput!]
  NOT: [EventActionWhereInput!]
}

input EventActionWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAction(data: ActionCreateInput!): Action!
  updateAction(data: ActionUpdateInput!, where: ActionWhereUniqueInput!): Action
  updateManyActions(data: ActionUpdateManyMutationInput!, where: ActionWhereInput): BatchPayload!
  upsertAction(where: ActionWhereUniqueInput!, create: ActionCreateInput!, update: ActionUpdateInput!): Action!
  deleteAction(where: ActionWhereUniqueInput!): Action
  deleteManyActions(where: ActionWhereInput): BatchPayload!
  createActionCategory(data: ActionCategoryCreateInput!): ActionCategory!
  updateActionCategory(data: ActionCategoryUpdateInput!, where: ActionCategoryWhereUniqueInput!): ActionCategory
  updateManyActionCategories(data: ActionCategoryUpdateManyMutationInput!, where: ActionCategoryWhereInput): BatchPayload!
  upsertActionCategory(where: ActionCategoryWhereUniqueInput!, create: ActionCategoryCreateInput!, update: ActionCategoryUpdateInput!): ActionCategory!
  deleteActionCategory(where: ActionCategoryWhereUniqueInput!): ActionCategory
  deleteManyActionCategories(where: ActionCategoryWhereInput): BatchPayload!
  createCommunityEvent(data: CommunityEventCreateInput!): CommunityEvent!
  updateCommunityEvent(data: CommunityEventUpdateInput!, where: CommunityEventWhereUniqueInput!): CommunityEvent
  updateManyCommunityEvents(data: CommunityEventUpdateManyMutationInput!, where: CommunityEventWhereInput): BatchPayload!
  upsertCommunityEvent(where: CommunityEventWhereUniqueInput!, create: CommunityEventCreateInput!, update: CommunityEventUpdateInput!): CommunityEvent!
  deleteCommunityEvent(where: CommunityEventWhereUniqueInput!): CommunityEvent
  deleteManyCommunityEvents(where: CommunityEventWhereInput): BatchPayload!
  createEventAction(data: EventActionCreateInput!): EventAction!
  updateEventAction(data: EventActionUpdateInput!, where: EventActionWhereUniqueInput!): EventAction
  updateManyEventActions(data: EventActionUpdateManyMutationInput!, where: EventActionWhereInput): BatchPayload!
  upsertEventAction(where: EventActionWhereUniqueInput!, create: EventActionCreateInput!, update: EventActionUpdateInput!): EventAction!
  deleteEventAction(where: EventActionWhereUniqueInput!): EventAction
  deleteManyEventActions(where: EventActionWhereInput): BatchPayload!
  createPetition(data: PetitionCreateInput!): Petition!
  updatePetition(data: PetitionUpdateInput!, where: PetitionWhereUniqueInput!): Petition
  updateManyPetitions(data: PetitionUpdateManyMutationInput!, where: PetitionWhereInput): BatchPayload!
  upsertPetition(where: PetitionWhereUniqueInput!, create: PetitionCreateInput!, update: PetitionUpdateInput!): Petition!
  deletePetition(where: PetitionWhereUniqueInput!): Petition
  deleteManyPetitions(where: PetitionWhereInput): BatchPayload!
  createRole(data: RoleCreateInput!): Role!
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  updateManyRoles(data: RoleUpdateManyMutationInput!, where: RoleWhereInput): BatchPayload!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  deleteRole(where: RoleWhereUniqueInput!): Role
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Petition {
  id: ID!
  title: String!
  active: Boolean
  short_description: String!
  body: String!
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PetitionConnection {
  pageInfo: PageInfo!
  edges: [PetitionEdge]!
  aggregate: AggregatePetition!
}

input PetitionCreateInput {
  title: String!
  active: Boolean
  short_description: String!
  body: String!
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
  users: UserCreateManyWithoutPetitions_signedInput
  author: UserCreateOneInput!
}

input PetitionCreateManyWithoutUsersInput {
  create: [PetitionCreateWithoutUsersInput!]
  connect: [PetitionWhereUniqueInput!]
}

input PetitionCreateWithoutUsersInput {
  title: String!
  active: Boolean
  short_description: String!
  body: String!
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
  author: UserCreateOneInput!
}

type PetitionEdge {
  node: Petition!
  cursor: String!
}

enum PetitionOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  active_ASC
  active_DESC
  short_description_ASC
  short_description_DESC
  body_ASC
  body_DESC
  order_ASC
  order_DESC
  primary_image_ASC
  primary_image_DESC
  video_url_ASC
  video_url_DESC
  external_url_ASC
  external_url_DESC
  hasVideo_ASC
  hasVideo_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PetitionPreviousValues {
  id: ID!
  title: String!
  active: Boolean
  short_description: String!
  body: String!
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input PetitionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  active: Boolean
  active_not: Boolean
  short_description: String
  short_description_not: String
  short_description_in: [String!]
  short_description_not_in: [String!]
  short_description_lt: String
  short_description_lte: String
  short_description_gt: String
  short_description_gte: String
  short_description_contains: String
  short_description_not_contains: String
  short_description_starts_with: String
  short_description_not_starts_with: String
  short_description_ends_with: String
  short_description_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  primary_image: String
  primary_image_not: String
  primary_image_in: [String!]
  primary_image_not_in: [String!]
  primary_image_lt: String
  primary_image_lte: String
  primary_image_gt: String
  primary_image_gte: String
  primary_image_contains: String
  primary_image_not_contains: String
  primary_image_starts_with: String
  primary_image_not_starts_with: String
  primary_image_ends_with: String
  primary_image_not_ends_with: String
  video_url: String
  video_url_not: String
  video_url_in: [String!]
  video_url_not_in: [String!]
  video_url_lt: String
  video_url_lte: String
  video_url_gt: String
  video_url_gte: String
  video_url_contains: String
  video_url_not_contains: String
  video_url_starts_with: String
  video_url_not_starts_with: String
  video_url_ends_with: String
  video_url_not_ends_with: String
  external_url: String
  external_url_not: String
  external_url_in: [String!]
  external_url_not_in: [String!]
  external_url_lt: String
  external_url_lte: String
  external_url_gt: String
  external_url_gte: String
  external_url_contains: String
  external_url_not_contains: String
  external_url_starts_with: String
  external_url_not_starts_with: String
  external_url_ends_with: String
  external_url_not_ends_with: String
  hasVideo: Boolean
  hasVideo_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PetitionScalarWhereInput!]
  OR: [PetitionScalarWhereInput!]
  NOT: [PetitionScalarWhereInput!]
}

type PetitionSubscriptionPayload {
  mutation: MutationType!
  node: Petition
  updatedFields: [String!]
  previousValues: PetitionPreviousValues
}

input PetitionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PetitionWhereInput
  AND: [PetitionSubscriptionWhereInput!]
  OR: [PetitionSubscriptionWhereInput!]
  NOT: [PetitionSubscriptionWhereInput!]
}

input PetitionUpdateInput {
  title: String
  active: Boolean
  short_description: String
  body: String
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
  users: UserUpdateManyWithoutPetitions_signedInput
  author: UserUpdateOneRequiredInput
}

input PetitionUpdateManyDataInput {
  title: String
  active: Boolean
  short_description: String
  body: String
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
}

input PetitionUpdateManyMutationInput {
  title: String
  active: Boolean
  short_description: String
  body: String
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
}

input PetitionUpdateManyWithoutUsersInput {
  create: [PetitionCreateWithoutUsersInput!]
  delete: [PetitionWhereUniqueInput!]
  connect: [PetitionWhereUniqueInput!]
  disconnect: [PetitionWhereUniqueInput!]
  update: [PetitionUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [PetitionUpsertWithWhereUniqueWithoutUsersInput!]
  deleteMany: [PetitionScalarWhereInput!]
  updateMany: [PetitionUpdateManyWithWhereNestedInput!]
}

input PetitionUpdateManyWithWhereNestedInput {
  where: PetitionScalarWhereInput!
  data: PetitionUpdateManyDataInput!
}

input PetitionUpdateWithoutUsersDataInput {
  title: String
  active: Boolean
  short_description: String
  body: String
  order: Int
  primary_image: String
  video_url: String
  external_url: String
  hasVideo: Boolean
  author: UserUpdateOneRequiredInput
}

input PetitionUpdateWithWhereUniqueWithoutUsersInput {
  where: PetitionWhereUniqueInput!
  data: PetitionUpdateWithoutUsersDataInput!
}

input PetitionUpsertWithWhereUniqueWithoutUsersInput {
  where: PetitionWhereUniqueInput!
  update: PetitionUpdateWithoutUsersDataInput!
  create: PetitionCreateWithoutUsersInput!
}

input PetitionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  active: Boolean
  active_not: Boolean
  short_description: String
  short_description_not: String
  short_description_in: [String!]
  short_description_not_in: [String!]
  short_description_lt: String
  short_description_lte: String
  short_description_gt: String
  short_description_gte: String
  short_description_contains: String
  short_description_not_contains: String
  short_description_starts_with: String
  short_description_not_starts_with: String
  short_description_ends_with: String
  short_description_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  primary_image: String
  primary_image_not: String
  primary_image_in: [String!]
  primary_image_not_in: [String!]
  primary_image_lt: String
  primary_image_lte: String
  primary_image_gt: String
  primary_image_gte: String
  primary_image_contains: String
  primary_image_not_contains: String
  primary_image_starts_with: String
  primary_image_not_starts_with: String
  primary_image_ends_with: String
  primary_image_not_ends_with: String
  video_url: String
  video_url_not: String
  video_url_in: [String!]
  video_url_not_in: [String!]
  video_url_lt: String
  video_url_lte: String
  video_url_gt: String
  video_url_gte: String
  video_url_contains: String
  video_url_not_contains: String
  video_url_starts_with: String
  video_url_not_starts_with: String
  video_url_ends_with: String
  video_url_not_ends_with: String
  external_url: String
  external_url_not: String
  external_url_in: [String!]
  external_url_not_in: [String!]
  external_url_lt: String
  external_url_lte: String
  external_url_gt: String
  external_url_gte: String
  external_url_contains: String
  external_url_not_contains: String
  external_url_starts_with: String
  external_url_not_starts_with: String
  external_url_ends_with: String
  external_url_not_ends_with: String
  hasVideo: Boolean
  hasVideo_not: Boolean
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  author: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PetitionWhereInput!]
  OR: [PetitionWhereInput!]
  NOT: [PetitionWhereInput!]
}

input PetitionWhereUniqueInput {
  id: ID
}

type Query {
  action(where: ActionWhereUniqueInput!): Action
  actions(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Action]!
  actionsConnection(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionConnection!
  actionCategory(where: ActionCategoryWhereUniqueInput!): ActionCategory
  actionCategories(where: ActionCategoryWhereInput, orderBy: ActionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionCategory]!
  actionCategoriesConnection(where: ActionCategoryWhereInput, orderBy: ActionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionCategoryConnection!
  communityEvent(where: CommunityEventWhereUniqueInput!): CommunityEvent
  communityEvents(where: CommunityEventWhereInput, orderBy: CommunityEventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CommunityEvent]!
  communityEventsConnection(where: CommunityEventWhereInput, orderBy: CommunityEventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommunityEventConnection!
  eventAction(where: EventActionWhereUniqueInput!): EventAction
  eventActions(where: EventActionWhereInput, orderBy: EventActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EventAction]!
  eventActionsConnection(where: EventActionWhereInput, orderBy: EventActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventActionConnection!
  petition(where: PetitionWhereUniqueInput!): Petition
  petitions(where: PetitionWhereInput, orderBy: PetitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Petition]!
  petitionsConnection(where: PetitionWhereInput, orderBy: PetitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PetitionConnection!
  role(where: RoleWhereUniqueInput!): Role
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Role {
  id: ID!
  role_name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type RoleConnection {
  pageInfo: PageInfo!
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  role_name: String!
}

input RoleCreateOneInput {
  create: RoleCreateInput
  connect: RoleWhereUniqueInput
}

type RoleEdge {
  node: Role!
  cursor: String!
}

enum RoleOrderByInput {
  id_ASC
  id_DESC
  role_name_ASC
  role_name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RolePreviousValues {
  id: ID!
  role_name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
  AND: [RoleSubscriptionWhereInput!]
  OR: [RoleSubscriptionWhereInput!]
  NOT: [RoleSubscriptionWhereInput!]
}

input RoleUpdateDataInput {
  role_name: String
}

input RoleUpdateInput {
  role_name: String
}

input RoleUpdateManyMutationInput {
  role_name: String
}

input RoleUpdateOneInput {
  create: RoleCreateInput
  update: RoleUpdateDataInput
  upsert: RoleUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: RoleWhereUniqueInput
}

input RoleUpsertNestedInput {
  update: RoleUpdateDataInput!
  create: RoleCreateInput!
}

input RoleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  role_name: String
  role_name_not: String
  role_name_in: [String!]
  role_name_not_in: [String!]
  role_name_lt: String
  role_name_lte: String
  role_name_gt: String
  role_name_gte: String
  role_name_contains: String
  role_name_not_contains: String
  role_name_starts_with: String
  role_name_not_starts_with: String
  role_name_ends_with: String
  role_name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [RoleWhereInput!]
  OR: [RoleWhereInput!]
  NOT: [RoleWhereInput!]
}

input RoleWhereUniqueInput {
  id: ID
}

enum Schedule {
  ANYTIME
  ONCE
  DAILY
  BIWEEKLY
  WEEKLY
  TWOWEEKS
  MONTHLY
  QUARTERLY
  SEMIANNUALLY
  ANNUALLY
}

type Subscription {
  action(where: ActionSubscriptionWhereInput): ActionSubscriptionPayload
  actionCategory(where: ActionCategorySubscriptionWhereInput): ActionCategorySubscriptionPayload
  communityEvent(where: CommunityEventSubscriptionWhereInput): CommunityEventSubscriptionPayload
  eventAction(where: EventActionSubscriptionWhereInput): EventActionSubscriptionPayload
  petition(where: PetitionSubscriptionWhereInput): PetitionSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  username: String
  email: String
  password: String!
  name: String!
  phone: String
  token: String
  role: Role
  zipcode: String
  recent_actions(where: EventActionWhereInput, orderBy: EventActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EventAction!]
  total_points: Int
  petitions_signed(where: PetitionWhereInput, orderBy: PetitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Petition!]
  community_events(where: CommunityEventWhereInput, orderBy: CommunityEventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CommunityEvent!]
  device_id: String
  crew: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String
  email: String
  password: String!
  name: String!
  phone: String
  token: String
  role: RoleCreateOneInput
  zipcode: String
  recent_actions: EventActionCreateManyWithoutUserInput
  total_points: Int
  petitions_signed: PetitionCreateManyWithoutUsersInput
  community_events: CommunityEventCreateManyInput
  device_id: String
  crew: String
}

input UserCreateManyWithoutPetitions_signedInput {
  create: [UserCreateWithoutPetitions_signedInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutRecent_actionsInput {
  create: UserCreateWithoutRecent_actionsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPetitions_signedInput {
  username: String
  email: String
  password: String!
  name: String!
  phone: String
  token: String
  role: RoleCreateOneInput
  zipcode: String
  recent_actions: EventActionCreateManyWithoutUserInput
  total_points: Int
  community_events: CommunityEventCreateManyInput
  device_id: String
  crew: String
}

input UserCreateWithoutRecent_actionsInput {
  username: String
  email: String
  password: String!
  name: String!
  phone: String
  token: String
  role: RoleCreateOneInput
  zipcode: String
  total_points: Int
  petitions_signed: PetitionCreateManyWithoutUsersInput
  community_events: CommunityEventCreateManyInput
  device_id: String
  crew: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  phone_ASC
  phone_DESC
  token_ASC
  token_DESC
  zipcode_ASC
  zipcode_DESC
  total_points_ASC
  total_points_DESC
  device_id_ASC
  device_id_DESC
  crew_ASC
  crew_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  username: String
  email: String
  password: String!
  name: String!
  phone: String
  token: String
  zipcode: String
  total_points: Int
  device_id: String
  crew: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  zipcode: String
  zipcode_not: String
  zipcode_in: [String!]
  zipcode_not_in: [String!]
  zipcode_lt: String
  zipcode_lte: String
  zipcode_gt: String
  zipcode_gte: String
  zipcode_contains: String
  zipcode_not_contains: String
  zipcode_starts_with: String
  zipcode_not_starts_with: String
  zipcode_ends_with: String
  zipcode_not_ends_with: String
  total_points: Int
  total_points_not: Int
  total_points_in: [Int!]
  total_points_not_in: [Int!]
  total_points_lt: Int
  total_points_lte: Int
  total_points_gt: Int
  total_points_gte: Int
  device_id: String
  device_id_not: String
  device_id_in: [String!]
  device_id_not_in: [String!]
  device_id_lt: String
  device_id_lte: String
  device_id_gt: String
  device_id_gte: String
  device_id_contains: String
  device_id_not_contains: String
  device_id_starts_with: String
  device_id_not_starts_with: String
  device_id_ends_with: String
  device_id_not_ends_with: String
  crew: String
  crew_not: String
  crew_in: [String!]
  crew_not_in: [String!]
  crew_lt: String
  crew_lte: String
  crew_gt: String
  crew_gte: String
  crew_contains: String
  crew_not_contains: String
  crew_starts_with: String
  crew_not_starts_with: String
  crew_ends_with: String
  crew_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  role: RoleUpdateOneInput
  zipcode: String
  recent_actions: EventActionUpdateManyWithoutUserInput
  total_points: Int
  petitions_signed: PetitionUpdateManyWithoutUsersInput
  community_events: CommunityEventUpdateManyInput
  device_id: String
  crew: String
}

input UserUpdateInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  role: RoleUpdateOneInput
  zipcode: String
  recent_actions: EventActionUpdateManyWithoutUserInput
  total_points: Int
  petitions_signed: PetitionUpdateManyWithoutUsersInput
  community_events: CommunityEventUpdateManyInput
  device_id: String
  crew: String
}

input UserUpdateManyDataInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  zipcode: String
  total_points: Int
  device_id: String
  crew: String
}

input UserUpdateManyMutationInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  zipcode: String
  total_points: Int
  device_id: String
  crew: String
}

input UserUpdateManyWithoutPetitions_signedInput {
  create: [UserCreateWithoutPetitions_signedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutPetitions_signedInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutPetitions_signedInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutRecent_actionsInput {
  create: UserCreateWithoutRecent_actionsInput
  update: UserUpdateWithoutRecent_actionsDataInput
  upsert: UserUpsertWithoutRecent_actionsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutPetitions_signedDataInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  role: RoleUpdateOneInput
  zipcode: String
  recent_actions: EventActionUpdateManyWithoutUserInput
  total_points: Int
  community_events: CommunityEventUpdateManyInput
  device_id: String
  crew: String
}

input UserUpdateWithoutRecent_actionsDataInput {
  username: String
  email: String
  password: String
  name: String
  phone: String
  token: String
  role: RoleUpdateOneInput
  zipcode: String
  total_points: Int
  petitions_signed: PetitionUpdateManyWithoutUsersInput
  community_events: CommunityEventUpdateManyInput
  device_id: String
  crew: String
}

input UserUpdateWithWhereUniqueWithoutPetitions_signedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutPetitions_signedDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutRecent_actionsInput {
  update: UserUpdateWithoutRecent_actionsDataInput!
  create: UserCreateWithoutRecent_actionsInput!
}

input UserUpsertWithWhereUniqueWithoutPetitions_signedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutPetitions_signedDataInput!
  create: UserCreateWithoutPetitions_signedInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  role: RoleWhereInput
  zipcode: String
  zipcode_not: String
  zipcode_in: [String!]
  zipcode_not_in: [String!]
  zipcode_lt: String
  zipcode_lte: String
  zipcode_gt: String
  zipcode_gte: String
  zipcode_contains: String
  zipcode_not_contains: String
  zipcode_starts_with: String
  zipcode_not_starts_with: String
  zipcode_ends_with: String
  zipcode_not_ends_with: String
  recent_actions_every: EventActionWhereInput
  recent_actions_some: EventActionWhereInput
  recent_actions_none: EventActionWhereInput
  total_points: Int
  total_points_not: Int
  total_points_in: [Int!]
  total_points_not_in: [Int!]
  total_points_lt: Int
  total_points_lte: Int
  total_points_gt: Int
  total_points_gte: Int
  petitions_signed_every: PetitionWhereInput
  petitions_signed_some: PetitionWhereInput
  petitions_signed_none: PetitionWhereInput
  community_events_every: CommunityEventWhereInput
  community_events_some: CommunityEventWhereInput
  community_events_none: CommunityEventWhereInput
  device_id: String
  device_id_not: String
  device_id_in: [String!]
  device_id_not_in: [String!]
  device_id_lt: String
  device_id_lte: String
  device_id_gt: String
  device_id_gte: String
  device_id_contains: String
  device_id_not_contains: String
  device_id_starts_with: String
  device_id_not_starts_with: String
  device_id_ends_with: String
  device_id_not_ends_with: String
  crew: String
  crew_not: String
  crew_in: [String!]
  crew_not_in: [String!]
  crew_lt: String
  crew_lte: String
  crew_gt: String
  crew_gte: String
  crew_contains: String
  crew_not_contains: String
  crew_starts_with: String
  crew_not_starts_with: String
  crew_ends_with: String
  crew_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
  email: String
  phone: String
}
`
      }
    