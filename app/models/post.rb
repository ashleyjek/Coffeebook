# == Schema Information
#
# Table name: posts
#
#  id              :bigint           not null, primary key
#  author_id       :bigint           not null
#  body            :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  profile_user_id :integer
#
class Post < ApplicationRecord
    validates :body, presence: true unless :photo

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

    has_many :comments,
    foreign_key: :post_id,
    class_name: :Comment,
    dependent: :destroy

    belongs_to :profile,
    foreign_key: :profile_user_id,
    class_name: :User
    
    has_many :likes, as: :likeable,
    dependent: :destroy

    has_one_attached :photo
end
