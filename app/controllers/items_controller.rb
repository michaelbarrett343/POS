class ItemsController < ApplicationController
  def index
    @items = current_user.items # Fetch items for the current user
    @item = Item.new
  end
  

     def new
      puts "New Item action called"
      @item = Item.new
    end
    
    def create
      puts "Create Item action called"
      @item = current_user.items.new(item_params)
    
      respond_to do |format|
        if @item.save
          format.html { redirect_to items_path, notice: 'Item was successfully created.' }
          format.json { render json: @item, status: :created }
        else
          puts @item.errors.full_messages
          format.html { render :new }
          format.json { render json: @item.errors, status: :unprocessable_entity }
        end
      end
    end

    def update
      @item = Item.find(params[:id])
      if @item.update(item_params)
        render json: @item, status: :ok
      else
        render json: @item.errors, status: :unprocessable_entity
      end
    end

  
    def destroy
      @item = Item.find(params[:id])
      @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
    end


  
    def fetch_by_category
      category = params[:category]
      items = Item.where(category: category)
      render json: items
    end

  private

  def item_params
    params.require(:item).permit(:name, :cost_price, :sale_price, :category)
  end

   def set_user
     if user_signed_in?
      @current_user = current_user
     end
   end


end
