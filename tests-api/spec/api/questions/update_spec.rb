# frozen_string_literal: true

require "rails_helper"

RSpec.describe "questions#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/questions/#{question.id}", payload
  end

  describe "basic update" do
    let!(:question) { create(:binary_question) }

    let(:payload) do
      {
        data: {
          id: question.id.to_s,
          type: "questions",
          attributes: {
            content: "New content",
          },
        },
      }
    end

    it "updates the resource" do
      expect(QuestionResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change { question.reload.attributes }
    end
  end
end
