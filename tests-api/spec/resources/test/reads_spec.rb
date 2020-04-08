# frozen_string_literal: true

require "rails_helper"

RSpec.describe TestResource, type: :resource do
  describe "serialization" do
    let!(:test) { create(:test) }

    it "works" do
      render
      data = jsonapi_data[0]
      expect(data.rawid).to eq(test.id)
      expect(data.jsonapi_type).to eq("tests")
    end
  end

  describe "filtering" do
    let!(:test1) { create(:test) }
    let!(:test2) { create(:test) }

    context "by id" do
      before do
        params[:filter] = { id: { eq: test2.id } }
      end

      it "works" do
        render
        expect(d.map(&:rawid)).to eq([test2.id])
      end
    end
  end

  describe "sorting" do
    describe "by title" do
      let!(:test1) { create(:test, title: "A") }
      let!(:test2) { create(:test, title: "Z") }
      let(:actual_titles) { jsonapi_data.map { |node| node["title"] } }

      context "when ascending" do
        before do
          params[:sort] = "title"
        end

        it "works" do
          render
          expect(actual_titles).to eq([
                                        test1.title,
                                        test2.title,
                                      ])
        end
      end

      context "when descending" do
        before do
          params[:sort] = "-title"
        end

        it "works" do
          render
          expect(actual_titles).to eq([
                                        test2.title,
                                        test1.title,
                                      ])
        end
      end
    end
  end

  describe "sideloading" do
    # ... your tests ...
  end
end
