# frozen_string_literal: true

class OptionsValidator < ActiveModel::Validator
  def validate(record)
    contract = options[:contract].new
    result   = contract.call(record.options)
    errors   = result.errors

    errors.messages.each do |message|
      path = message.path.join(".")
      text = message.text
      record.errors.add("options.#{path}", text)
    end
  end
end
