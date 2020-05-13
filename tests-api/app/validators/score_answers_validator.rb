# frozen_string_literal: true

class ScoreAnswersValidator < ContractValidator
  def validate(record)
    merge_options!(
      contract: ScoreAnswersContract.new,
      input_data: record.as_json.slice("answers"),
    )
    super(record)
  end
end
