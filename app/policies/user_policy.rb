class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
       scope.where(id: user.id)
    end
  end

  def show?
    record.id == user.id
  end

  def update?
    record.id == user.id
  end

  def destroy?
    record.id == user.id
  end
end
