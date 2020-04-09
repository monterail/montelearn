# frozen_string_literal: true

class BinaryQuestion < Question
  validates_with OptionsValidator, contract: BinaryQuestionOptionsContract
end
