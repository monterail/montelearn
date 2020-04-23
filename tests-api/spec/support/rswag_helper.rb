# frozen_string_literal: true

module RswagHelper
  RESOURCE_SCHEMA = {
    type: :object,
    properties: {
      uuid: { type: :string },
      question_type: { type: :string },
      subject: { type: :string },
      question: { type: :string },
      choices: {
        type: :array,
        items: {
          type: :object,
          properties: {
            answer: { type: :string },
            correct: { type: :boolean },
          },
        },
      },
    },
    required: %w(uuid subject question_type question choices),
  }.freeze

  COLLECTION_SCHEMA = {
    type: :object,
    properties: {
      count: { type: :integer },
      next: { type: :string, nullable: true },
      previous: { type: :string, nullable: true },
      results: {
        type: :array,
        items: RESOURCE_SCHEMA,
      },
    },
    required: %w(count next previous results),
  }.freeze

  RESOURCE_EXAMPLE = {
    "application/json" => TestPresenter.new(FactoryBot.create(:test, :binary_question)).as_json,
  }.freeze

  COLLECTION_EXAMPLE = {
    "application/json" => {
      count: 10,
      next: nil,
      previous: nil,
      results: [
        TestPresenter.new(FactoryBot.create(:test, :binary_question)).as_json,
      ],
    },
  }.freeze

  NOT_FOUND_SCHEMA = {
    type: :object,
    properties: {
      detail: { type: :string },
    },
    required: %w(detail),
  }.freeze

  NOT_FOUND_EXAMPLE = {
    "application/json" => {
      detail: "Not found.",
    },
  }.freeze
end
