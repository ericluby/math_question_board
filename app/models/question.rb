class Question < ApplicationRecord
  validates :status, presence: true
  validates :title, presence: true
end