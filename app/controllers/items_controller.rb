class ItemsController < ApplicationController
    def index
      @items = Item.where(items: { user_id: current_user.id })
    end
end
