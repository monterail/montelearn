# frozen_string_literal: true

class ChoicesForQuestionTypeValidator < ActiveModel::Validator
  def validate(record)
    contract = contract_for(record.question_type)
    result   = contract.call(record.attributes)
    errors   = result.errors

    errors.messages.each do |message|
      path = message.path.join(".")
      text = message.text
      record.errors.add(path, text)
    end
  end

  private

  def contract_for(question_type)
    "#{question_type.underscore.classify}QuestionContract".constantize.new
  end
end
