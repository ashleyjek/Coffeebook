# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord
    validates :user_id, :friend_id, presence: true
    validates :user_id, uniqueness: {scope: :friend_id, message: "Friendship already exists!"}
    validate :self_add?

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :friend,
    foreign_key: :friend_id,
    class_name: :User

    def self_add?
        if user_id == friend_id
            errors.add(:user_id, 'You cannot add yourself!')
        end
    end
end
