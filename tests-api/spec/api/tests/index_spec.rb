# frozen_string_literal: true

require "rails_helper"

RSpec.describe "tests#index", type: :request do
  subject(:make_request) do
    jsonapi_get "/api/tests", params: params
  end

  let(:params) { {} }

  describe "basic fetch" do
    let!(:test1) { create(:test) }
    let!(:test2) { create(:test) }

    it "works" do
      expect(TestResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(["tests"])
      expect(d.map(&:rawid)).to match_array([test1.id, test2.id])
    end
  end
end
