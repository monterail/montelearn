# frozen_string_literal: true

class UseCase
  attr_reader :params, :errors

  def self.call(params: {})
    new(params: params).tap(&:call)
  end

  def initialize(params:)
    @params = params
    @errors = {}
  end

  def success?
    errors.empty?
  end

  def call
    raise NotImplementedError
  end

  def data
    raise NotImplementedError
  end

  private

  def step(method)
    return unless success?

    send(method)
  end

  def add_error(attribute, message)
    @errors[attribute] ||= []
    @errors[attribute] << message
  end
end
