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
      correct_choices = correct_choices(answer[:question_uuid])
      correct_answer = answered_correctly?(
        correct_choices,
        answer[:selected_choices],
      )

      @correct_questions += 1 if correct_answer

      {
        question_uuid: answer[:question_uuid],
        correct_answers: correct_choices,
        answered_correctly: correct_answer,
      }
    end
  end

  def correct_choices(question_uuid)
    question = questions.find(question_uuid)
    question.choices.select { |c| c[:correct] }.map { |c| c[:answer] }
  end

  def answered_correctly?(correct_choices, selected_choices)
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
