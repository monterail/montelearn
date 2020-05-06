# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  describe "handling ActionDispatch::Http::Parameters::ParseError exceptions" do
    controller do
      def custom
        params
      end
    end

    before do
      routes.draw { post "custom" => "anonymous#custom" }
      post :custom, body: "{,}", as: :json
    end

    it { expect(response).to have_http_status(400) }
    it { expect(response.body).to eq({ detail: "783: unexpected token at '{,}'" }.to_json) }
  end
end
