class PetitionService
  # Search for petitions that matches search text, region and user if those arguments are not null
  def self.search(search_text:, latitude:, longitude:, radius:, limit:, offset:, user_id:)
    query = Petition.includes(:media_files, :user).all.order(updated_at: :desc)
    query = search_text_scope(query, search_text) if search_text.present?
    if latitude.present? && longitude.present? && radius.present?
      query = region_scope(query, latitude: latitude, longitude: longitude, radius: radius)
    end
    query = query.where(user_id: user_id) if user_id.present?
    query.limit(limit).offset(offset)
  end

  private

  # Filter the petitions that has the search text in the title or description
  def self.search_text_scope(query, search)
    query.where("title ILIKE ? OR description ILIKE ?", "%#{search}%", "%#{search}%")
  end

  # Filter the petitions that are in the region defined by latitude, longitude and radius
  def self.region_scope(query, latitude:, longitude:, radius: 20)
    query.
      where("latitude <= ? AND latitude >= ?", latitude + radius / 110.574, latitude - radius / 110.574).
      where("longitude <= ? AND longitude >= ?", longitude + radius / 110.574, longitude - radius / 110.574)
  end
end
