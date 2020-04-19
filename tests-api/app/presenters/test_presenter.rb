# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      subject: @object.subject,
      question: @object.question,
      answer: @object.answer,
    }
  end
end
