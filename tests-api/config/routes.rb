# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: lambda { |_env|
    [200, { "Content-Type" => "text/plain" }, ["Hello World!"]]
  }
end
