# Sets Petition permissions
class PetitionPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  # Can show all permissions to any user
  def show?
    true
  end

  # An user can only update a permission that the user created
  def update?
    record.user_id == user.id
  end

  # An user can only delete it's own Petitions
  def destroy?
    record.user_id == user.id
  end
end
