# frozen_string_literal: true

class CalculateScore < UseCase
  def call
    step :validate_presence_of_test
    step :validate_with_score_answers_contract
    step :validate_all_questions_must_be_answered
    step :calculate_results
    step :calculate_score
  end

  def data
    @data ||= {
      score: nil,
      results: nil,
    }
  end

  private

  def validate_presence_of_test
    add_error(:test, "can't be blank") unless test.is_a?(Test)
  end

  def test
    @test ||= params[:test]
  end

  def validate_with_score_answers_contract
    ScoreAnswersContract.new.call(answers: answers).tap do |result|
      errors.merge!(result.errors.to_hash) unless result.success?
    end
  end

  def answers
    @answers ||= params[:answers]
  end

  def validate_all_questions_must_be_answered
    add_error(:answers, "are required for all Test Questions") unless all_questions_answered?
  end

  def all_questions_answered?
    test_questions_uuids    = test.questions.pluck(:id)
    answers_questions_uuids = answers.map { |a| a[:question_uuid] }
    (test_questions_uuids - answers_questions_uuids).empty?
  end

  def calculate_results
    data[:results] ||=
      answers.map do |hash|
        question_uuid, selected_choices = hash[:question_uuid], hash[:selected_choices]
        {
          question_uuid: question_uuid,
          correct: answered_correctly?(question_uuid, selected_choices),
        }
      end
  end

  def answered_correctly?(question_uuid, selected_choices)
    question        = test.questions.find(question_uuid)
    correct_choices = question.choices.select { |c| c[:correct] }.map { |c| c[:answer] }
    (correct_choices - selected_choices).empty?
  end

  def calculate_score
    data[:score] ||= begin
      correct_questions = data[:results].select { |r| r[:correct] }.count
      total_questions   = test.questions.size
      "#{correct_questions}/#{total_questions}"
    end
  end
end
