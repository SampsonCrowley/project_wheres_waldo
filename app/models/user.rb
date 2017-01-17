class User < ApplicationRecord
  has_many :tags, -> { includes :character }

  validates :initials, length: { maximum: 3, minimum: 2 }
end
