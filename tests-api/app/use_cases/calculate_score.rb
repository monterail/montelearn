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
    CalculateScoreContract.new.call(params).tap do |result|
      errors.merge!(result.errors.to_hash) unless result.success?
    end
  end

  def calculate
    calculate_results
    calculate_score
  end

  def calculate_results
    data[:results] ||=
      params[:answers].map do |hash|
        question_uuid, selected_choices = hash[:question_uuid], hash[:selected_choices]
        {
          question_uuid: question_uuid,
          correct: answered_correctly?(question_uuid, selected_choices),
        }
      end
  end

  def answered_correctly?(question_uuid, selected_choices)
    question        = params[:test].questions.find(question_uuid)
    correct_choices = question.choices.select { |c| c[:correct] }.map { |c| c[:answer] }
    (correct_choices - selected_choices).empty?
  end

  def calculate_score
    data[:score] ||= begin
      correct_questions = data[:results].select { |r| r[:correct] }.count
      total_questions   = params[:test].questions.size
      "#{correct_questions}/#{total_questions}"
    end
  end
end
