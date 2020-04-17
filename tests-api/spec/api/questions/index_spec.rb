# frozen_string_literal: true

require "rails_helper"

RSpec.describe "questions#index", type: :request do
  subject(:make_request) do
    jsonapi_get "/api/questions", params: params
  end

  let(:params) { {} }

  describe "basic fetch" do
    let!(:question1) { create(:binary_question) }
    let!(:question2) { create(:binary_question) }

    it "works" do
      expect(QuestionResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(["binary_questions"])
      expect(d.map(&:rawid)).to match_array([question1.id, question2.id])
    end
  end
end
