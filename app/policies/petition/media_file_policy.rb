class Petition::MediaFilePolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end

  def show?
    true
  end

  def update?
    return true if record.petition_id.blank?
    record.petition.user.id == user.id
  end
end
