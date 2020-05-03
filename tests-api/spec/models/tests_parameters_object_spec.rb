# frozen_string_literal: true

require "rails_helper"

RSpec.describe TestsParametersObject, type: :model do
  describe "#to_h" do
    subject { described_class.new(params).to_h }

    let(:params) { ActionController::Parameters.new(raw_params) }

    context "when params has unknown data" do
      let(:raw_params) { { unknown: "data" } }

      it "returns only whitelist data" do
        expect(subject).to eq({})
      end
    end

    context "when params has questions data" do
      let(:raw_params) { { questions: [{ uuid: "uuid" }] } }

      it "returns questions_attributes data" do
        expect(subject).to eq({ "questions_attributes" => [{ "id" => "uuid" }] })
      end
    end
  end
end
