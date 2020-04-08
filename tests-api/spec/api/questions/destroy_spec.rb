# frozen_string_literal: true

require "rails_helper"

RSpec.describe "questions#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/questions/#{question.id}"
  end

  describe "basic destroy" do
    let!(:question) { create(:binary_question) }

    it "updates the resource" do
      expect(QuestionResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change(Question, :count).by(-1)
      expect { question.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq("meta" => {})
    end
  end
end
