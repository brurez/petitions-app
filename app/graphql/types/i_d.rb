class Types::ID <  GraphQL::Schema::Scalar
  graphql_name "ModelID"

  def self.coerce_input(val, ctx)
    val.to_i
  end

  def self.coerce_result(val, ctx)
    val.to_i
  end
end
