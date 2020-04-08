# frozen_string_literal: true

require "rails_helper"

RSpec.describe "tests#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/tests/#{test.id}", payload
  end

  describe "basic update" do
    let!(:test) { create(:test) }

    let(:payload) do
      {
        data: {
          id: test.id.to_s,
          type: "tests",
          attributes: {
            title: "New title",
          },
        },
      }
    end

    it "updates the resource" do
      expect(TestResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change { test.reload.attributes }
    end
  end
end
