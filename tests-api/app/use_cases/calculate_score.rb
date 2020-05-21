# frozen_string_literal: true

class CalculateScore < UseCase
  def call
    validate

    return if errors.any?

    calculate
  end

  def data
    @data ||= {
      score: nil,
      results: nil,
    }
  end

  private

  def validate
    @errors = CalculateScoreContract.new.call(params).errors.to_hash
  end

  def calculate
    data[:results] = calculate_results
    data[:score]   = calculate_score
  end

  def calculate_results
    @correct_questions = 0

    answers.map do |answer|
      correct = answered_correctly?(
        answer[:question_uuid],
        answer[:selected_choices],
      )

      @correct_questions += 1 if correct

      {
        question_uuid: answer[:question_uuid],
        correct: correct,
      }
    end
  end

  def answered_correctly?(question_uuid, selected_choices)
    question        = questions.find(question_uuid)
    correct_choices = question.choices.select { |c| c[:correct] }.map { |c| c[:answer] }
    (correct_choices - selected_choices).empty?
  end

  def calculate_score
    "#{@correct_questions}/#{questions.size}"
  end

  def answers
    @answers ||= params[:answers]
  end

  def questions
    @questions ||= params[:test].questions
  end
end
