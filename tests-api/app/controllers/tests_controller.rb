# frozen_string_literal: true

class TestsController < ApplicationController
  def index
    tests = TestResource.all(params)
    respond_with(tests)
  end

  def show
    test = TestResource.find(params)
    respond_with(test)
  end

  def create
    test = TestResource.build(params)

    if test.save
      render jsonapi: test, status: :created
    else
      render jsonapi_errors: test
    end
  end

  def update
    test = TestResource.find(params)

    if test.update_attributes
      render jsonapi: test
    else
      render jsonapi_errors: test
    end
  end

  def destroy
    test = TestResource.find(params)

    if test.destroy
      render jsonapi: { meta: {} }, status: :ok
    else
      render jsonapi_errors: test
    end
  end
end
