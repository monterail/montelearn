# frozen_string_literal: true

ChoiceSchema = Dry::Schema.Params do
  required(:content).filled(:str?)
  required(:correct).filled(:bool?)
end

class BinaryQuestionOptionsContract < Dry::Validation::Contract
  params do
    required(:choices).filled(:array, size?: 2).each(ChoiceSchema)
  end

  rule(:choices) do
    correct_values = value.map { |h| h[:correct].to_s }
    key.failure("must have different correct values") if correct_values.uniq.one?
  end
end
