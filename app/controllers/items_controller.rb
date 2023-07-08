class ItemsController < ApplicationController
    def index
      @items = Item.where(items: { user_id: current_user.id })
    end

    def new
      @item = Item.new
    end
  
    def create
      @Item = Item.create
    end
  
    def destroy
      @Item.delete
    end
  
  private
   def set_user
     if user_signed_in?
      @current_user = current_user
     end
   end
end
