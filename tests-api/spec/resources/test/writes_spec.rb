# frozen_string_literal: true

require "rails_helper"

RSpec.describe TestResource, type: :resource do
  describe "creating" do
    let(:payload) do
      {
        data: {
          type: "tests",
          attributes: attributes_for(:test),
        },
      }
    end

    let(:instance) do
      described_class.build(payload)
    end

    it "works" do
      expect do
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      end.to change(Test, :count).by(1)
    end
  end

  describe "updating" do
    let!(:test) { create(:test) }

    let(:payload) do
      {
        data: {
          id: test.id.to_s,
          type: "tests",
          attributes: {
            title: "New title",
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
      end.to change { test.reload.updated_at }
        .and change(test, :title).to("New title")
    end
  end

  describe "destroying" do
    let!(:test) { create(:test) }

    let(:instance) do
      described_class.find(id: test.id)
    end

    it "works" do
      expect do
        expect(instance.destroy).to eq(true)
      end.to change(Test, :count).by(-1)
    end
  end
end
