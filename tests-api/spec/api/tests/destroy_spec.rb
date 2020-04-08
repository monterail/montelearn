# frozen_string_literal: true

require "rails_helper"

RSpec.describe "tests#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/tests/#{test.id}"
  end

  describe "basic destroy" do
    let!(:test) { create(:test) }

    it "updates the resource" do
      expect(TestResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change(Test, :count).by(-1)
      expect { test.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq("meta" => {})
    end
  end
end
