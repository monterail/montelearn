# frozen_string_literal: true

require "rails_helper"

RSpec.describe QuestionResource, type: :resource do
  describe "serialization" do
    let!(:question) { create(:binary_question) }

    it "works" do
      render
      data = jsonapi_data[0]
      expect(data.rawid).to eq(question.id)
      expect(data.jsonapi_type).to eq("binary")
    end
  end

  describe "filtering" do
    let!(:question1) { create(:binary_question) }
    let!(:question2) { create(:binary_question) }

    context "by id" do
      before do
        params[:filter] = { id: { eq: question2.id } }
      end

      it "works" do
        render
        expect(d.map(&:rawid)).to eq([question2.id])
      end
    end
  end

  describe "sorting" do
    describe "by content" do
      let!(:question1) { create(:binary_question, content: "A") }
      let!(:question2) { create(:binary_question, content: "Z") }
      let(:actual_contents) { jsonapi_data.map { |node| node["content"] } }

      context "when ascending" do
        before do
          params[:sort] = "content"
        end

        it "works" do
          render
          expect(actual_contents).to eq([
                                          question1.content,
                                          question2.content,
                                        ])
        end
      end

      context "when descending" do
        before do
          params[:sort] = "-content"
        end

        it "works" do
          render
          expect(actual_contents).to eq([
                                          question2.content,
                                          question1.content,
                                        ])
        end
      end
    end
  end

  describe "sideloading" do
    # ... your tests ...
  end
end
