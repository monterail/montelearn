# frozen_string_literal: true

require "rails_helper"

RSpec.describe "questions#show", type: :request do
  subject(:make_request) do
    jsonapi_get "/api/questions/#{question.id}", params: params
  end

  let(:params) { {} }

  describe "basic fetch" do
    let!(:question) { create(:binary_question) }

    it "works" do
      expect(QuestionResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq("binary")
      expect(d.rawid).to eq(question.id)
    end
  end
end
