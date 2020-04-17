# frozen_string_literal: true

require "rails_helper"

RSpec.describe "questions#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/questions", payload
  end

  describe "basic create" do
    let(:params) do
      attributes_for(:binary_question)
    end
    let(:payload) do
      {
        data: {
          type: "binary_questions",
          attributes: params,
        },
      }
    end

    it "works" do
      expect(QuestionResource).to receive(:build).and_call_original
      expect do
        make_request
        expect(response.status).to eq(201), response.body
      end.to change(Question, :count).by(1)
    end
  end
end
