# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/swagger"
  mount Rswag::Api::Engine => "/swagger"
  scope :api do
    namespace :admin do
      resources :tests
    end
    resources :tests, only: %i(index show)
  end
end
