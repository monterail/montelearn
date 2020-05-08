# frozen_string_literal: true

require "rails_helper"

RSpec.describe TestsQuery do
  describe "#all" do
    subject(:get_all) { described_class.new(filter_params).all }

    let!(:test_1) { create(:test) }
    let!(:test_2) { create(:test) }

    context "with filter params" do
      let(:filter_params) { {} }

      it "returns all tests" do
        expect(get_all).to contain_exactly(test_1, test_2)
      end
    end

    context "without filter params" do
      let(:filter_params) { { lesson_uuid: test_1.lesson_uuid } }

      it "returns filtered tests" do
        expect(get_all).to contain_exactly(test_1)
      end
    end
  end
end
