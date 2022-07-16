class VotePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    has_already_voted = record.petition.votes.find_by(user: user).present?
    !has_already_voted
  end

  def update?
    false
  end

  def destroy?
    false
  end
end
