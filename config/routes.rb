Rails.application.routes.draw do
  root 'homes#index'

  get 'classrooms/:id', to: 'homes#index'
  get 'classrooms/:classroom_id/questions/:question_id', to: 'homes#index'

  devise_for :users

  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
      get "users/current" => "users#current_user"
      resources :classrooms, only: [:index, :show, :create] do
        resources :questions, only: [:index, :create, :show] do
          resources :messages, only: [:create]
        end
      end
      resources :rosters, only: [:create]
    end
  end

  get "chats/:id" => "homes#index"

end
