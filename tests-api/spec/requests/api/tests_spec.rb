# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "api/tests", type: :request do
  path "/api/backoffice/articles" do
    get "Find all articles" do
      tags "Articles"
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
                 count: :integer,
                 next: :integer,
                 previous: :integer,
                 results: {
                   type: :array,
                   items: {
                     type: :object,
                     properties: {
                       id: { type: :string },
                       subject: { type: :string },
                       question: { type: :string },
                       answer: { type: :string },
                     },
                   },
                 },
               }
        let(:test) { create(:test) }
        run_test!
      end
    end
  end

  path "/tests/{id}" do
    get "Retrieves a test" do
      tags "Tests"
      produces "application/json"
      parameter name: :id, in: :path, type: :string

      response "200", :success do
        schema type: :object,
               properties: {
                 id: { type: :string },
                 subject: { type: :string },
                 question: { type: :string },
                 answer: { type: :string },
               },
               required: %w(id subject question answer)

        let(:id) { create(:test).id }
        run_test!
      end

      response "404", :not_found do
        let(:id) { "invalid" }
        run_test!
      end

      response "406", "unsupported accept header" do
        let(:Accept) { "application/foo" }
        run_test!
      end
    end
  end
end
