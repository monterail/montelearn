# frozen_string_literal: true

module Admin
  class TestsController < ::ApplicationController
    # GET /admin/tests
    def index
      tests = TestsQuery.new(filter_params).all
      render_collection(tests)
    end

    # GET /admin/tests/:id
    def show
      test = Test.find(params[:id])
      render_resource(test)
    end

    # POST /admin/tests/
    def create
      test = Test.create!(test_params)
      render_resource(test, :created)
    end

    # PUT /admin/tests/:id
    def update
      test = Test.find(params[:id])
      test.update!(test_params)
      render_resource(test)
    end

    # DESTROY /admin/tests/:id
    def destroy
      Test.find(params[:id]).destroy
      head :no_content
    end

    private

    def filter_params
      params.permit(
        :lesson_uuid,
      ).to_h
    end

    def test_params
      params.permit(
        :lesson_uuid,
        questions: [
          :uuid,
          :_destroy,
          :question_type,
          :content,
          :question,
          choices: %i(answer correct),
        ],
      ).to_h.tap do |hash|
        process_questions_attributes!(hash) if hash.key?(:questions)
      end
    end

    def process_questions_attributes!(hash)
      hash[:questions].each { |h| h[:id] = h.delete(:uuid) }
      hash[:questions_attributes] = hash.delete(:questions)
    end
  end
end
