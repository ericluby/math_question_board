Rails.application.routes.draw do
  root 'homes#index'

  get 'classrooms/:id', to: 'homes#index'

  devise_for :users

  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :create]
      resources :users, only: [:show]
      get "users/current" => "users#current_user"
      resources :classrooms, only: [:index, :show, :create]
    end
  end

  get "chats/:id" => "homes#index"

end
