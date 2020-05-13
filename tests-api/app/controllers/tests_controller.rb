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

  private

  def filter_params
    params.permit(
      :lesson_uuid,
    ).to_h
  end
end
