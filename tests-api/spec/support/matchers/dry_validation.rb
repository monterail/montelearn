# frozen_string_literal: true

# https://medium.com/@alirezabashiri/tired-of-json-schema-try-dry-validation-d68c7244aaa
RSpec::Matchers.define :match_schema do |schema|
  match do |response|
    @result = schema.call(JSON.parse(response.body, symbolize_names: true))
    @result.success?
  end

  def failure_message
    @result.errors
  end
end

# https://relishapp.com/rspec/rspec-expectations/v/3-1/docs/custom-matchers/define-matcher
RSpec::Matchers.define :be_valid_with_contract do |contract|
  match do |attributes|
    @result = contract.new.call(attributes)
    @result.success?
  end

  def failure_message
    @result.errors
  end
end
