# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    resources :tests, only: %i(index show)
  end
end
