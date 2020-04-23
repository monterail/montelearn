# frozen_string_literal: true

class ApplicationController < ActionController::API
  private

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    render json: { "detail": "Not found." }, status: :not_found
  end

  def render_collection(relation)
    render json: {
      "count": relation.size,
      "next": nil,
      "previous": nil,
      "results": relation.map { |resource| presenter.new(resource).as_json },
    }
  end

  def render_resource(resource)
    render json: presenter.new(resource).as_json
  end

  def presenter
    "#{controller_path.classify}Presenter".constantize
  end
end
