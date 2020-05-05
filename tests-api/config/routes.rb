# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/swagger"
  mount Rswag::Api::Engine => "/swagger"
  scope :api do
    resources :tests
  end
end
