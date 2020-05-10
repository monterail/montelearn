# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "api/tests", type: :request do
  path "/api/tests/" do
    get "Retrieves tests" do
      tags "Tests"
      produces "application/json"
      parameter name: :limit, in: :query, type: :integer, required: false,
                description: "Number of results to return per page."
      parameter name: :offset, in: :query, type: :integer, required: false,
                description: "The initial index from which to return the results."
      parameter name: :lesson_uuid, in: :query, type: :string, required: false,
                description: "Filter results by lesson_uuid."

      response "200", "A list of tests." do
        schema Rswag::TestsHelper::COLLECTION_SCHEMA
        examples "application/json" => Rswag::TestsHelper::COLLECTION_EXAMPLE
        before { create(:test, :with_binary_questions) }

        run_test!
      end
    end
  end

  path "/api/tests/{uuid}" do
    get "Retrieves a test" do
      tags "Tests"
      produces "application/json"
      parameter name: :uuid, in: :path, type: :string

      response "200", "A Test object." do
        schema Rswag::TestsHelper::RESOURCE_SCHEMA
        examples "application/json" => Rswag::TestsHelper::RESOURCE_EXAMPLE
        let(:uuid) { create(:test, :with_binary_questions).id }
        run_test!
      end

      response "404", "Not found." do
        schema Rswag::TestsHelper::NOT_FOUND_SCHEMA
        examples "application/json" => Rswag::TestsHelper::NOT_FOUND_EXAMPLE
        let(:uuid) { "invalid" }
        run_test!
      end
    end
  end
end
