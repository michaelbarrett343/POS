class Bill < ApplicationRecord
  has_many :items, dependent: :destroy
end
