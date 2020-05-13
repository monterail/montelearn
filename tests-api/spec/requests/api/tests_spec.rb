# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "api/tests", type: :request do
  resource_schema = {
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
  }

  resource_example = {
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
  }

  path "/api/tests/" do
    get "Retrieves tests" do
      collection_schema = {
        type: :object,
        properties: {
          count: { type: :integer },
          next: { type: :string, nullable: true },
          previous: { type: :string, nullable: true },
          results: {
            type: :array,
            items: resource_schema,
          },
        },
        required: %w(count next previous results),
      }

      collection_example = {
        count: 1,
        next: nil,
        previous: nil,
        results: [
          resource_example,
        ],
      }

      tags "Tests"
      produces "application/json"
      parameter name: :limit, in: :query, type: :integer, required: false,
                description: "Number of results to return per page."
      parameter name: :offset, in: :query, type: :integer, required: false,
                description: "The initial index from which to return the results."
      parameter name: :lesson_uuid, in: :query, type: :string, required: false,
                description: "Filter results by lesson_uuid."

      response "200", "A list of tests." do
        schema collection_schema
        examples "application/json" => collection_example
        before { create(:test, :with_binary_questions) }

        run_test!
      end
    end
  end

  path "/api/tests/{uuid}" do
    not_found_schema = {
      type: :object,
      properties: {
        detail: { type: :string },
      },
      required: %w(detail),
    }

    not_found_example = { detail: "Not found." }

    get "Retrieves a test" do
      tags "Tests"
      produces "application/json"
      parameter name: :uuid, in: :path, type: :string

      response "200", "A Test object." do
        schema resource_schema
        examples "application/json" => resource_example
        let(:uuid) { create(:test, :with_binary_questions).id }
        run_test!
      end

      response "404", "Not found." do
        schema not_found_schema
        examples "application/json" => not_found_example
        let(:uuid) { "invalid" }
        run_test!
      end
    end
  end
end
