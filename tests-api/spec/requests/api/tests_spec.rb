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

      response "200", "A list of tests." do
        schema Rswag::TestsHelper::COLLECTION_SCHEMA
        examples "application/json" => Rswag::TestsHelper::COLLECTION_EXAMPLE
        before { create(:test, :with_binary_questions) }

        run_test!
      end
    end

    post "Creates a test" do
      tags "Tests"
      consumes "application/json"
      produces "application/json"
      parameter name: :payload, in: :body, schema: Rswag::TestsHelper::POST_PAYLOAD_SCHEMA

      response "201", "Test created." do
        schema Rswag::TestsHelper::RESOURCE_SCHEMA
        examples "application/json" => Rswag::TestsHelper::RESOURCE_EXAMPLE
        let(:test) { build(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(id created_at updated_at)) }
        run_test!
      end

      response "400", "Validation failed." do
        schema Rswag::TestsHelper::VALIDATION_FAILED_SCHEMA
        examples "application/json" => Rswag::TestsHelper::VALIDATION_FAILED_EXAMPLE
        let(:test) { build(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(lesson_uuid)) }
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

    put "Updates a test" do
      tags "Tests"
      consumes "application/json"
      produces "application/json"
      parameter name: :uuid, in: :path, type: :string
      parameter name: :payload, in: :body, schema: Rswag::TestsHelper::PUT_PAYLOAD_SCHEMA

      response "200", "Test updated." do
        schema Rswag::TestsHelper::RESOURCE_SCHEMA
        examples "application/json" => Rswag::TestsHelper::RESOURCE_EXAMPLE
        let(:test) { create(:test, :with_binary_questions) }
        let(:payload) { test.as_json(except: %i(created_at updated_at)) }
        let(:uuid) { test.id }
        run_test!
      end

      response "400", "Validation failed." do
        schema Rswag::TestsHelper::VALIDATION_FAILED_SCHEMA
        examples "application/json" => Rswag::TestsHelper::VALIDATION_FAILED_EXAMPLE
        let(:test) { create(:test, :with_binary_questions) }
        let(:payload) { { lesson_uuid: "" } }
        let(:uuid) { test.id }
        run_test!
      end

      response "404", "Not found." do
        schema Rswag::TestsHelper::NOT_FOUND_SCHEMA
        examples "application/json" => Rswag::TestsHelper::NOT_FOUND_EXAMPLE
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
        schema Rswag::TestsHelper::NOT_FOUND_SCHEMA
        examples "application/json" => Rswag::TestsHelper::NOT_FOUND_EXAMPLE
        let(:uuid) { "invalid" }
        run_test!
      end
    end
  end
end
