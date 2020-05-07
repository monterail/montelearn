# frozen_string_literal: true

class TestsQuery
  FILTER_PARAMS = [
    :lesson_uuid,
  ].freeze

  def initialize(params = {}, relation = Test.all)
    @params = params
    @relation = relation
  end

  def all
    return @relation unless filter_params.any?

    @relation.where(filter_params)
  end

  private

  def filter_params
    @filter_params ||= @params.permit(FILTER_PARAMS).to_h
  end
end
