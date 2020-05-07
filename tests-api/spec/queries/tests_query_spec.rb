# frozen_string_literal: true

require "rails_helper"

RSpec.describe TestsQuery do
  describe "#all" do
    subject { described_class.new(params).all }

    let(:params) { ActionController::Parameters.new(raw_params) }
    let!(:test_1) { create(:test) }
    let!(:test_2) { create(:test) }

    context "with filtering params" do
      let(:raw_params) { {} }

      it "returns all tests" do
        expect(subject).to contain_exactly(test_1, test_2)
      end
    end

    context "without filtering params" do
      let(:raw_params) { { lesson_uuid: test_1.lesson_uuid } }

      it "returns filtered tests" do
        expect(subject).to contain_exactly(test_1)
      end
    end
  end
end
