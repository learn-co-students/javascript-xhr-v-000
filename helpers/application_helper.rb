module ApplicationHelper
  def current_user
    if session[:user_id]
      User.find_by(id: session[:user_id])
    end
  end

  def home_path
    if current_user.children.count == 0
       new_child_path
    elsif current_user.children.count ==1
       child_skills_path(current_user.children[0])
    else
      children_path
    end
  end

end
