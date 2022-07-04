class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
       scope.where(email: user.email)
    end
  end

  def show?
    record.email == user.email
  end

  def update?
    record.email == user.email
  end

  def destroy?
    record.email == user.email
  end
end
