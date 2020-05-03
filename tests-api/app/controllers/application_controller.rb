# frozen_string_literal: true

class ApplicationController < ActionController::API
  private

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors

  # Issue: https://github.com/rails/rails/issues/38285
  # Workaround: https://github.com/rails/rails/issues/34244#issuecomment-433365579
  def process_action(*args)
    super
  rescue ActionDispatch::Http::Parameters::ParseError => e
    render_bad_request(e)
  end

  def render_not_found(exception)
    render json: { detail: exception.message }, status: :not_found
  end

  def render_validation_errors(exception)
    render json: exception.record.errors.messages, status: :bad_request
  end

  def render_bad_request(exception)
    render json: { detail: exception.message }, status: :bad_request
  end

  def render_collection(relation)
    render json: {
      count: relation.size,
      next: nil,
      previous: nil,
      results: relation.map { |resource| present(resource) },
    }
  end

  def render_resource(resource, status = :ok)
    render json: present(resource), status: status
  end

  def present(resource)
    "#{resource.class}Presenter".constantize.new(resource).as_json
  end
end
