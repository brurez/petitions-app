# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.create!(
  email: "bruno@email.com",
  first_name: "Bruno",
  last_name: "de Rezende",
  password: "1234"
)

user2 = User.create!(
  email: "another@email.com",
  first_name: "John",
  last_name: "Doe",
  password: "1234"
)

petitions = Petition.create!(
  [
    { title: "Stop cutting trees in my street",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      user: user1,
      latitude: -3.7,
      longitude: -38.5,
      address: "My address",
      city: "City name",
      state: "SC",
      country: "BR",
      postal_code: "88000-888"
    },
    { title: "Street walks on 1st Avenue are dangerous",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      user: user2,
      latitude: -3.6,
      longitude: -38.6,
      address: "My address",
      city: "City name",
      state: "SC",
      country: "BR",
      postal_code: "88000-888"
    },
    { title: "Too much noise near the airport",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      user: user2,
      latitude: -3.4,
      longitude: -38.3,
      address: "My address",
      city: "City name",
      state: "SC",
      country: "BR",
      postal_code: "88000-888"
    }
  ]
)

Vote.create!(
  [
    {
      user: user1,
      petition: petitions[1]
    },
    {
      user: user2,
      petition: petitions[0]
    }
  ]
)
