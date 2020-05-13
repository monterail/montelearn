# frozen_string_literal: true

class ScorePresenter < Presenter
  def as_json(*)
    {
      score: @object.score,
      results: @object.results,
    }
  end
end
