Rails.application.routes.draw do

devise_for :users
root to: "pages#home"

resources :items, except: [:show] do
  member do
    get :current_user_selected_item
    patch :update_item
  end
end
get 'items/fetch_by_category', to: 'items#fetch_by_category'

end
