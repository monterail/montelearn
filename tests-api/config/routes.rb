# frozen_string_literal: true

Rails.application.routes.draw do
  scope path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    mount VandalUi::Engine, at: "/vandal"
    resources :tests
    resources :questions
  end
end
