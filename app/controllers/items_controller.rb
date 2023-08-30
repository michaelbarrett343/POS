class ItemsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @items = current_user.items # Fetch items for the current user
  end
  
    
    def create
      puts "Create Item action called"
      @item = current_user.items.new(item_params)
      respond_to do |format|
        if @item.save
          puts "item saved"
          format.html { redirect_to items_path, notice: 'Item was successfully created.' }
          format.json { render json: @item, status: :created }
        else
          puts @item.errors.full_messages
          format.html { render :new }
          format.json { render json: @item.errors, status: :unprocessable_entity }
        end
      end
    end

    def update_item
      @item = current_user.items.find(params[:id])
      respond_to do |format|
        if @item.update(item_params)
          format.json { render json: @item, status: :ok }
          format.html { redirect_to items_url, notice: 'Item was successfully updated.' }
        else
          format.json { render json: @item.errors, status: :unprocessable_entity }
          format.html { render :edit }
        end
      end
    end

  
    def destroy
      @item = current_user.items.find(params[:id])
      @item.destroy
      puts "deleting item"
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
    end

    def current_user_selected_item
      @item = Item.find(params[:id])
      render json: @item
    end
  
    def fetch_by_category
      puts "finding item by category"
      category = params[:category]
      items = current_user.items.where(category: category).order(:name)
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
