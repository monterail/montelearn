# frozen_string_literal: true

class OptionsForQuestionTypeValidator < ActiveModel::Validator
  def validate(record)
    options = record.options
    return record.errors.add(:options, :empty) if options.blank?

    namespace = record.class.parent.to_s
    return unless record.class::QUESTION_TYPES.include?(namespace)

    contract = "#{namespace}OptionsContract".constantize.new
    result   = contract.call(options)
    errors   = result.errors

    errors.messages.each do |message|
      path = message.path.join(".")
      text = message.text
      record.errors.add("options.#{path}", text)
    end
  end
end
