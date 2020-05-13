# frozen_string_literal: true

class ScoreAnswersContract < Dry::Validation::Contract
  params do
    required(:answers).filled(:array).each do
      schema do
        required(:question_uuid).filled(:str?)
        required(:selected_choices).filled(:array?).each(:str?)
      end
    end
  end
end
