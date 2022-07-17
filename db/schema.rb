# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_17_144329) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "comment_text"
    t.bigint "user_id", null: false
    t.bigint "petition_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["petition_id"], name: "index_comments_on_petition_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "petition_media_files", force: :cascade do |t|
    t.string "url"
    t.string "filename"
    t.string "content_type"
    t.bigint "petition_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["petition_id"], name: "index_petition_media_files_on_petition_id"
  end

  create_table "petitions", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.string "address"
    t.string "city", null: false
    t.string "state", limit: 2
    t.string "country", limit: 2, null: false
    t.integer "postal_code"
    t.index ["user_id"], name: "index_petitions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "petition_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["petition_id"], name: "index_votes_on_petition_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "comments", "petitions"
  add_foreign_key "comments", "users"
  add_foreign_key "petition_media_files", "petitions"
  add_foreign_key "petitions", "users"
  add_foreign_key "votes", "petitions"
  add_foreign_key "votes", "users"
end
