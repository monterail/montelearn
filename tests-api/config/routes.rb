# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/swagger"
  mount Rswag::Api::Engine => "/swagger"
  scope :api do
    namespace :admin do
      resources :tests
    end
    resources :tests, only: %i(index show) do
      member do
        resources :scores, only: %i(create)
      end
    end
  end
end
