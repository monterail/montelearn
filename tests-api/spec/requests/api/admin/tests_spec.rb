# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "api/admin/tests", type: :request do
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
                  correct: { type: :boolean },
                },
                required: %w(answer correct),
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
          { answer: "totam",
            correct: true },
          { answer: "est",
            correct: false },
        ],
      },
    ],
  }

  validation_failed_schema = {
    type: :object,
    properties: {
      subject: { type: :array, items: { type: :string } },
      lesson_uuid: { type: :array, items: { type: :string } },
      question_type: { type: :array, items: { type: :string } },
      question: { type: :array, items: { type: :string } },
      choices: { type: :array, items: { type: :string } },
    },
  }

  validation_failed_example = {
    lesson_uuid: ["can't be blank"],
  }

  path "/api/admin/tests/" do
    get "Retrieves tests" do
      collection_schema = {
        type: :object,
        properties: {
          count: { type: :integer },
          next: { type: :string, nullable: true },
          previous: { type: :string, nullable: true },
          results: {
            type: :array,
            items: resource_example,
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

    post "Creates a test" do
      post_payload_schema = {
        type: :object,
        properties: {
          lesson_uuid: { type: :string },
          questions: {
            type: :array,
            items: {
              type: :object,
              properties: {
                question_type: { type: :string },
                content: { type: :string },
                choices: {
                  type: :array,
                  items: {
                    type: :object,
                    properties: {
                      answer: { type: :string },
                      correct: { type: :boolean },
                    },
                    required: %w(answer correct),
                  },
                },
              },
              required: %w(question_type content choices),
            },
          },
        },
        required: %w(lesson_uuid questions),
      }

      tags "Tests"
      consumes "application/json"
      produces "application/json"
      parameter name: :payload, in: :body, schema: post_payload_schema

      response "201", "Test created." do
        schema resource_schema
        examples "application/json" => resource_example
        let(:test) { build(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(id created_at updated_at)) }
        run_test!
      end

      response "400", "Validation failed." do
        schema validation_failed_schema
        examples "application/json" => validation_failed_example
        let(:test) { build(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(lesson_uuid)) }
        run_test!
      end
    end
  end

  path "/api/admin/tests/{uuid}" do
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

    put "Updates a test" do
      put_payload_schema = {
        type: :object,
        properties: {
          lesson_uuid: { type: :string },
          questions: {
            type: :array,
            items: {
              type: :object,
              properties: {
                uuid: { type: :string },
                _delete: { type: :boolean },
                question_type: { type: :string },
                content: { type: :string },
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
            },
          },
        },
      }

      tags "Tests"
      consumes "application/json"
      produces "application/json"
      parameter name: :uuid, in: :path, type: :string
      parameter name: :payload, in: :body, schema: put_payload_schema

      response "200", "Test updated." do
        schema resource_schema
        examples "application/json" => resource_example
        let(:test) { create(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(created_at updated_at)) }
        let(:uuid) { test.id }
        run_test!
      end

      response "400", "Validation failed." do
        schema validation_failed_schema
        examples "application/json" => validation_failed_example
        let(:test) { create(:test, :with_binary_questions) }
        let(:payload) { { lesson_uuid: "" } }
        let(:uuid) { test.id }
        run_test!
      end

      response "404", "Not found." do
        schema not_found_schema
        examples "application/json" => not_found_example
        let(:payload) { {} }
        let(:uuid) { "invalid" }
        run_test!
      end
    end

    delete "Destroys a test" do
      tags "Tests"
      produces "application/json"
      parameter name: :uuid, in: :path, type: :string

      response "204", "Test deleted." do
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
