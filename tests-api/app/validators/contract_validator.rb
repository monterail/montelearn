# frozen_string_literal: true

class ContractValidator < ActiveModel::Validator
  def validate(record)
    result = contract.call(input_data)
    add_errors(result.errors, record) unless result.success?
  end

  private

  def contract
    options.fetch(:contract)
  end

  def input_data
    options.fetch(:input_data)
  end

  def add_errors(errors, record)
    errors.messages.each do |message|
      path = message.path.join(".")
      text = message.text
      record.errors.add(path, text)
    end
  end

  def merge_options!(new_options)
    @options = @options.dup.merge(new_options)
  end
end
