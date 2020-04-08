# frozen_string_literal: true

require "rails_helper"

RSpec.describe "tests#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/tests", payload
  end

  describe "basic create" do
    let(:params) do
      attributes_for(:test)
    end
    let(:payload) do
      {
        data: {
          type: "tests",
          attributes: params,
        },
      }
    end

    it "works" do
      expect(TestResource).to receive(:build).and_call_original
      expect do
        make_request
        expect(response.status).to eq(201), response.body
      end.to change(Test, :count).by(1)
    end
  end
end
