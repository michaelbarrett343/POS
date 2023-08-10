Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "pages#home"
  resources :items, :except => [:show]
  #get 'search', to: 'items#search', as: :search_items
  get 'items/fetch_by_category', to: 'items#fetch_by_category'
  #get 'users/:id/items' => 'items#index', :as => :user_items_path

  resources :user do
    resources :items
  end
end
