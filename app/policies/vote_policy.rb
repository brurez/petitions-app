class VotePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # An user can only create a vote if it has not voted before for this permission
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
