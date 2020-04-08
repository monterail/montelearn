# frozen_string_literal: true

require "rails_helper"

RSpec.describe "tests#show", type: :request do
  subject(:make_request) do
    jsonapi_get "/api/tests/#{test.id}", params: params
  end

  let(:params) { {} }

  describe "basic fetch" do
    let!(:test) { create(:test) }

    it "works" do
      expect(TestResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq("tests")
      expect(d.rawid).to eq(test.id)
    end
  end
end
