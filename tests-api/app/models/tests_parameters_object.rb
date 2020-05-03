# frozen_string_literal: true

class TestsParametersObject
  PERMITTED_PARAMS = [
    :lesson_uuid,
    :title,
    :description,
    questions: [
      :uuid,
      :_destroy,
      :question_type,
      :content,
      :question,
      choices: %i(answer correct),
    ],
  ].freeze

  def initialize(params)
    @params = params
  end

  def to_h
    @params.permit(PERMITTED_PARAMS).to_h.tap do |hash|
      process_questions_attributes!(hash) if hash.key?(:questions)
    end
  end

  private

  def process_questions_attributes!(hash)
    hash[:questions].each { |h| h[:id] = h.delete(:uuid) }
    hash[:questions_attributes] = hash.delete(:questions)
  end
end
