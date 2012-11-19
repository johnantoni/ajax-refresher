### respond_to

    respond_to :html, :xml, :json

### respond_with

    respond_with do |format|
      format.html do
        if request.xhr?
          render :json => @comment.errors, :status => :unprocessable_entity
          render :partial => "comments/show", :locals => { :comment => @comment }, :layout => false, :status => :created
        else
          render :action => :new, :status => :unprocessable_entity
        end
      end
      format.json do
      end
    end 

### loader

    before_filter :load, :only => [:index]

    def load
      @posts = Post.all
      @post = Post.new
    end

