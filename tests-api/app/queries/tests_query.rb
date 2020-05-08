# frozen_string_literal: true

class TestsQuery
  def initialize(filter_params = {}, relation = Test.all)
    @filter_params = filter_params
    @relation = relation
  end

  def all
    return @relation unless @filter_params.any?

    @relation.where(@filter_params)
  end
end
