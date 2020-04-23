# frozen_string_literal: true

class TestsController < ApplicationController
  # GET /tests
  def index
    tests = Test.all
    render_collection(tests)
  end

  # GET /tests/1
  def show
    test = Test.find(params[:id])
    render_resource(test)
  end

  # POST /tests/
  def create
    test = Test.new(test_params)

    return render_validation_errors(test) unless test.save

    render_resource(test, :created)
  end

  private

  def test_params
    params.permit(
      :uuid,
      :question_type,
      :subject,
      :question,
      choices: %i(answer correct),
    )
  end
end
