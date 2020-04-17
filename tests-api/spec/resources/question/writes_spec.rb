# frozen_string_literal: true

require "rails_helper"

RSpec.describe QuestionResource, type: :resource do
  describe "creating" do
    let(:payload) do
      {
        data: {
          type: "binary_questions",
          attributes: attributes_for(:binary_question),
        },
      }
    end

    let(:instance) do
      described_class.build(payload)
    end

    it "works" do
      expect do
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      end.to change(Question, :count).by(1)
    end
  end

  describe "updating" do
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

    let(:instance) do
      described_class.find(payload)
    end

    it "works (add some attributes and enable this spec)" do
      expect do
        expect(instance.update_attributes).to eq(true)
      end.to change { question.reload.updated_at }
        .and change(question, :content).to("New content")
    end
  end

  describe "destroying" do
    let!(:question) { create(:binary_question) }

    let(:instance) do
      described_class.find(id: question.id)
    end

    it "works" do
      expect do
        expect(instance.destroy).to eq(true)
      end.to change(Question, :count).by(-1)
    end
  end
end
