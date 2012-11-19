##########################################
# Add to config/initializers/mime_types.rb
Mime::Type.register_alias "application/json", :jsonr, %w( text/x-json )
##########################################


#######################################################
# Add this to app/controllers/application_controller.rb
#######################################################
def render_json_response(type, hash)
  unless [ :ok, :redirect, :error ].include?(type)
    raise "Invalid json response type: #{type}"
  end

  # To keep the structure consistent, we'll build the json 
  # structure with the default properties.
  #
  # This will also help other developers understand what 
  # is returned by the server by looking at this method.
  default_json_structure = { 
    :status => type, 
    :html => nil, 
    :message => nil, 
    :to => nil }.merge(hash)

  render_options = {:json => default_json_structure}  
  render_options[:status] = 400 if type == :error

  render(render_options)
end


################
# Usage Examples
################

# Success scenario with html
format.jsonr do
  render_json_response :ok, :html => "<b>Hello, world!</b>", :message => "Ajax response succeeded!"
end

# Success with a redirect
format.jsonr do
  render_json_response :redirect, :to => "http://www.paydrotalks.com"
end

# Failure scenario
format.jsonr do
  render_json_response :error, :message => "Oops!"
end