class PagesController < ApplicationController
  def home
    @user = current_user
    @items = Item.where(items: { user_id: current_user.id })
    @unique_categories = Item.where(items: { user_id: current_user.id }).distinct.pluck(:category)
    puts @unique_categories
  end
  
end