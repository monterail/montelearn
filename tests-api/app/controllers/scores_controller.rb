# frozen_string_literal: true

class ScoresController < ApplicationController
  # POST /tests/:id/scores
  def create
    score = Score.new(score_params)

    if score.valid?
      render_resource(score, :created)
    else
      render_validation_errors(score)
    end
  end

  private

  def score_params
    params.permit(
      answers: [
        :question_uuid,
        selected_choices: [],
      ],
    ).to_h.merge(
      test: Test.find(params[:id]),
    )
  end
end
