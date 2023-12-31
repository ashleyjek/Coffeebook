# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  post_id    :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :body, presence: true

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

    belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post

    has_many :likes, as: :likeable,
    dependent: :destroy

end
