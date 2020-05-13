# frozen_string_literal: true

class Score
  include ActiveModel::Model

  attr_accessor :test, :answers

  validates :test, presence: true
  validates_with ScoreAnswersValidator,     if: -> (record) { record.errors.empty? }
  validate :all_questions_must_be_answered, if: -> (record) { record.errors.empty? }

  def score
    correct_questions = results.select { |r| r[:correct] }.count
    total_questions   = test.questions.size
    "#{correct_questions}/#{total_questions}"
  end

  def results
    @results ||=
      answers.map do |hash|
        question_uuid, selected_choices = hash[:question_uuid], hash[:selected_choices]
        {
          question_uuid: question_uuid,
          correct: answered_correctly?(question_uuid, selected_choices),
        }
      end
  end

  private

  def all_questions_must_be_answered
    errors.add(:answers, "are required for all Test Questions") unless all_questions_answered?
  end

  def all_questions_answered?
    test_questions_uuids    = test.questions.pluck(:id)
    answers_questions_uuids = answers.map { |a| a[:question_uuid] }
    (test_questions_uuids - answers_questions_uuids).empty?
  end

  def answered_correctly?(question_uuid, selected_choices)
    question        = test.questions.find(question_uuid)
    correct_choices = question.choices.select { |c| c[:correct] }.map { |c| c[:answer] }
    (correct_choices - selected_choices).empty?
  end
end
