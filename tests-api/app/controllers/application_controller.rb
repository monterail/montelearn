# frozen_string_literal: true

class ApplicationController < ActionController::API
  private

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def render_not_found
    render json: { "detail": "Not found." }, status: :not_found
  end

  def render_validation_errors(resource)
    render json: resource.errors.messages, status: :bad_request
  end

  def render_collection(relation)
    render json: {
      "count": relation.size,
      "next": nil,
      "previous": nil,
      "results": relation.map { |resource| presenter.new(resource).as_json },
    }
  end

  def render_resource(resource, status = :ok)
    render json: presenter.new(resource).as_json, status: status
  end

  def presenter
    "#{controller_path.classify}Presenter".constantize
  end
end
