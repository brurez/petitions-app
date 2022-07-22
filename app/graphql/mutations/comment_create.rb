# frozen_string_literal: true

module Mutations
  class CommentCreate < BaseMutation
    description "Creates a new comment"

    field :comment, Types::CommentType, null: false

    argument :comment_input, Types::CommentInputType, required: true

    def resolve(comment_input:)
      authenticated?
      comment = ::Comment.new(**comment_input, user: current_user)
      raise GraphQL::ExecutionError.new "Error creating comment", extensions: comment.errors.to_hash unless comment.save

      { comment: comment }
    end
  end
end
