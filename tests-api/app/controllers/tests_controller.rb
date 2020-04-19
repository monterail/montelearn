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
end
