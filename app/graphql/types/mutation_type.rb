module Types
  class MutationType < Types::BaseObject
    field :user_delete, mutation: Mutations::UserDelete
    field :user_update, mutation: Mutations::UserUpdate
    field :user_create, mutation: Mutations::UserCreate
    field :user_login, mutation: Mutations::UserLogin
    field :petition_create, mutation: Mutations::PetitionCreate
  end
end
