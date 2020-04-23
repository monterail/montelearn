# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "api/tests", type: :request do
  path "/api/tests/" do
    get "Retrieves tests" do
      tags "Tests"
      produces "application/json"

      parameter name: :limit,
                in: :query,
                type: :integer,
                description: "Number of results to return per page.",
                required: false
      parameter name: :offset,
                in: :query,
                type: :integer,
                description: "The initial index from which to return the results.",
                required: false

      response "200", :success do
        schema type: :object,
               properties: {
                 count: { type: :integer },
                 next: { type: :integer, nullable: true },
                 previous: { type: :integer, nullable: true },
                 results: {
                   type: :array,
                   items: {
                     type: :object,
                     properties: {
                       uuid: { type: :string },
                       subject: { type: :string },
                       question: { type: :string },
                       answer: { type: :string },
                     },
                   },
                 },
               },
               required: %w(count next previous results)

        examples "application/json" => {
          count: 10,
          next: nil,
          previous: nil,
          results: [
            {
              uuid: "b77eb326-efc1-41e1-a37e-c66bcff4f340",
              subject: "Science",
              question: "Is math related to science?",
              answer: "Non't",
            },
          ],
        }

        let(:test) { create(:test, :binary_question) }

        run_test!
      end
    end
  end

  path "/api/tests/{uuid}" do
    get "Retrieves a test" do
      tags "Tests"
      produces "application/json"

      parameter name: :uuid, in: :path, type: :string

      response "200", :success do
        schema type: :object,
               properties: {
                 uuid: { type: :string },
                 subject: { type: :string },
                 question: { type: :string },
                 answer: { type: :string },
               },
               required: %w(uuid subject question answer)

        examples "application/json" => {
          uuid: "b77eb326-efc1-41e1-a37e-c66bcff4f340",
          subject: "Science",
          question: "Is math related to science?",
          answer: "Non't",
        }

        let(:uuid) { create(:test).id }

        run_test!
      end

      response "404", :not_found do
        schema type: :object,
               properties: {
                 detail: { type: :string },
               }

        examples "application/json" => {
          detail: "Not found.",
        }

        let(:uuid) { "invalid" }

        run_test!
      end
    end
  end
end
