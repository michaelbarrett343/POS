Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "pages#home"
  get "items", to: "items#index"
  #get 'users/:id/items' => 'items#index', :as => :user_items_path

  resources :user do
    resources :items
  end
end
