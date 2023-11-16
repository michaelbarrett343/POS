class Bill < ApplicationRecord
  belongs_to :User
  has_and_belongs_to_many :items
end
