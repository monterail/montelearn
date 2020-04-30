# frozen_string_literal: true

class TestsController < ApplicationController
  # GET /tests
  def index
    tests = Test.all
    render_collection(tests)
  end

  # GET /tests/:id
  def show
    test = Test.find(params[:id])
    render_resource(test)
  end

  # POST /tests/
  def create
    test = Test.create!(test_params)
    render_resource(test, :created)
  end

  # PUT /tests/:id
  def update
    test = Test.find(params[:id])
    test.update!(test_params)
    render_resource(test)
  end

  # DESTROY /tests/:id
  def destroy
    Test.find(params[:id]).destroy
    head :no_content
  end

  private

  def test_params
    @test_params ||=
      params.permit(permitted_params).to_h.tap { |h| process_questions_attributes(h) }
  end

  def permitted_params
    [
      :uuid,
      :lesson_uuid,
      :title,
      :description,
      questions: [
        :uuid,
        :_destroy,
        :question_type,
        :content,
        :question,
        choices: %i(answer correct),
      ],
    ]
  end

  def process_questions_attributes(hash)
    return unless hash[:questions]

    hash[:questions].each { |h| h[:id] = h.delete(:uuid) }
    hash[:questions_attributes] = hash.delete(:questions)
  end
end
