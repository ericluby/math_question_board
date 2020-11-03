Rails.application.routes.draw do
  root 'homes#index'
 
  devise_for :users

  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :create]
      resources :messages, only: [:create]
      get "users/current" => "users#current_user"
    end
  end

  get "chats/:id" => "homes#index"

end
