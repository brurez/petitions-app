# Polity for the User model
class UserPolicy < ApplicationPolicy
  # Filter the result of db queries that returns multiple records
  # In this case the current user can only query it's own User record
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
       scope.where(id: user.id)
    end
  end

  # Returns if the current user can read a User record
  def show?
    record.id == user.id
  end

  # Returns if the current user can update a User record
  def update?
    record.id == user.id
  end

  # Returns if the current user can delete a User record
  def destroy?
    record.id == user.id
  end
end
