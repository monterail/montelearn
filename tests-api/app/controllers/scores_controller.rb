# frozen_string_literal: true

class ScoresController < ApplicationController
  # POST /tests/:id/scores
  def create
    use_case = CalculateScore.call(params: score_params)

    if use_case.success?
      render json: use_case.data, status: :created
    else
      render json: use_case.errors, status: :bad_request
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
