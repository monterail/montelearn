# frozen_string_literal: true

class ChoicesForQuestionTypeValidator < ContractValidator
  def validate(record)
    merge_options!(
      contract: contract_for(record.question_type),
      input_data: record.as_json.slice("choices"),
    )
    super(record)
  end

  private

  def contract_for(question_type)
    "#{question_type.underscore.classify}QuestionContract".constantize.new
  end
end
