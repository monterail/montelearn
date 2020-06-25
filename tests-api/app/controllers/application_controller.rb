# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :block_foreign_hosts

  private

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors

  def whitelisted?(ip)
    WHITELIST.include?(ip)
  end

  def block_foreign_hosts
    whitelist_include if WHITELIST.any? && Rails.env.production?
  end

  def whitelist_include
    head :unauthorized unless WHITELIST.include?(request.remote_ip)
  end

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
    namespace = self.class.name.deconstantize
    presenter = "#{resource.class}Presenter"
    presenter = "#{namespace}::#{presenter}" unless namespace.empty?
    presenter.constantize.new(resource).as_json
  end
end
