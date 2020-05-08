# frozen_string_literal: true

class TestsController < ApplicationController
  # GET /tests
  def index
    tests = TestsQuery.new(filter_params).all
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

  def filter_params
    params.permit(
      :lesson_uuid,
    ).to_h
  end

  def test_params
    @test_params ||= TestsParametersObject.new(params).to_h
  end
end
