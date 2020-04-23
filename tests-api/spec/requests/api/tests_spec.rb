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

      response "200", :success do
        schema RswagHelper::COLLECTION_SCHEMA
        examples RswagHelper::COLLECTION_EXAMPLE
        before { create(:test, :binary_question) }

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
        schema RswagHelper::RESOURCE_SCHEMA
        examples RswagHelper::RESOURCE_EXAMPLE
        let(:uuid) { create(:test, :binary_question).id }
        run_test!
      end

      response "404", :not_found do
        schema RswagHelper::NOT_FOUND_SCHEMA
        examples RswagHelper::NOT_FOUND_EXAMPLE
        let(:uuid) { "invalid" }
        run_test!
      end
    end
  end

  path "/api/tests/" do
    post "Creates a test" do
      tags "Tests"
      consumes "application/json"
      produces "application/json"
      parameter name: :test, in: :body, schema: RswagHelper::RESOURCE_SCHEMA

      response "201", :created do
        schema RswagHelper::RESOURCE_SCHEMA
        examples RswagHelper::RESOURCE_EXAMPLE
        let(:test) { build(:test, :binary_question).as_json(except: %i(id created_at updated_at)) }
        run_test!
      end

      response "400", "bad_request" do
        schema RswagHelper::BAD_REQUEST_SCHEMA
        examples RswagHelper::BAD_REQUEST_EXAMPLE
        let(:test) { build(:test, :binary_question).as_json(except: %i(choices)) }
        run_test!
      end
    end
  end
end
