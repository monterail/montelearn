# frozen_string_literal: true

module Rswag
  module TestsHelper
    RESOURCE_SCHEMA = {
      type: :object,
      properties: {
        uuid: { type: :string },
        lesson_uuid: { type: :string },
        questions: {
          type: :array,
          items: {
            type: :object,
            properties: {
              uuid: { type: :string },
              question_type: { type: :string },
              content: { type: :string },
              choices: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    answer: { type: :string },
                  },
                  required: %w(answer),
                },
              },
            },
            required: %w(uuid question_type content choices),
          },
        },
      },
      required: %w(uuid lesson_uuid questions),
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
      uuid: "34fde577-2360-4dd9-8aa3-a0d32b799336",
      lesson_uuid: "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
      questions: [
        {
          uuid: "95639f83-9600-4637-903a-c5b08d2f4e7c",
          question_type: "binary",
          content: "Voluptate repellat ut deserunt?",
          choices: [
            { answer: "totam" },
            { answer: "est" },
          ],
        },
      ],
    }.freeze

    COLLECTION_EXAMPLE = {
      count: 10,
      next: nil,
      previous: nil,
      results: [
        RESOURCE_EXAMPLE,
      ],
    }.freeze

    NOT_FOUND_SCHEMA = {
      type: :object,
      properties: {
        detail: { type: :string },
      },
      required: %w(detail),
    }.freeze

    NOT_FOUND_EXAMPLE = {
      detail: "Not found.",
    }.freeze
  end
end
