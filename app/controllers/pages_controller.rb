class PagesController < ApplicationController
  def home
    @users = User.all
    @user = current_user
    @items = Item.where(items: { user_id: current_user.id })
  end
end
