@friendships.each do |friendship|
    json.friendships do 
        json.set! friendship.id do 
            json.extract! friendship, :id, :user_id, :friend_id
        end
    end
end
