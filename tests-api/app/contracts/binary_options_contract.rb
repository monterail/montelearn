# frozen_string_literal: true

ChoiceSchema = Dry::Schema.Params do
  required(:content).filled(:str?)
  required(:correct).filled(:bool?)
end

class BinaryOptionsContract < Dry::Validation::Contract
  params do
    required(:choices).filled(:array, size?: 2).each(ChoiceSchema)
  end
end
