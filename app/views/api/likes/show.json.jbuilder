json.like do 
    json.extract! @like, :id, :liker_id, :likeable_id, :likeable_type
end