# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user = User.create!(
  email: "bruno@email.com",
  first_name: "Bruno",
  last_name: "de Rezende",
  password: "1234"
)

Petition.create!(
  title: "Stop cutting trees in my street",
  description: "This year the city hall started a work on my street. But they are cutting down all the trees.",
  user: user
)

Vote.create!(
  user: user,
  petition: petition
)
