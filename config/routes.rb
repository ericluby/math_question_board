Rails.application.routes.draw do
  root 'homes#index'

  get 'classrooms/:id', to: 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :create]
      resources :classrooms, only: [:index, :show]
    end
  end
end
