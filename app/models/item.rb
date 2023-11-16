class Item < ApplicationRecord
  belongs_to :user
  include PgSearch::Model
pg_search_scope :search_by_name,
  against: [:name],
  using: {
    tsearch: { prefix: true } 
  }
  
  def self.import(file, user)
    CSV.foreach(file.path, headers: true) do |row|
      item_hash = row.to_hash
      user.items.create!(item_hash)
    end
  end
end
