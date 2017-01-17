Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "sessions#new"
  resource :session, only: [:new, :create, :destroy]
  resources :tags, only: [:index, :create, :update, :destroy]
  resource :game, only: [:show]

end
