class ItemsController < ApplicationController
  def index
    @items = current_user.items # Fetch items for the current user
  end

    def new
      @item = Item.new
    end
  
    def create
     @item = Item.new(item_params) # Create a new item using the parameters submitted from the form
     @item.user = current_user # Associate the item with the current user

     if @item.save
      redirect_to items_path, notice: 'Item was successfully created.'
     else
      render :new
    end
    end
  
    def destroy
      @Item.delete
    end
  
    def fetch_by_category
      category = params[:category]
      items = Item.where(category: category)
      render json: items
    end

  private

  def item_params
    params.require(:item).permit(:name, :price, :category)
  end

   def set_user
     if user_signed_in?
      @current_user = current_user
     end
   end


end
