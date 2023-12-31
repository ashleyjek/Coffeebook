Rails.application.routes.draw do
  get 'rails/c'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get 'users/search', to: "users#search"
    resources :users, only: [:index, :create, :show, :update] do
      resources :posts, only: [:index]
    end
    resource :session, only: [:create, :show, :destroy]
    resources :posts, only: [:index, :create, :show, :update, :destroy]
    resources :comments, only: [:index, :create, :show, :update, :destroy]
    resources :friendships, only: [:index, :create, :destroy, :show]
    resources :likes, only: [:create, :destroy, :index]
  end
  
  get '*path', to: "static_pages#frontend_index"
end
