# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      subject: @object.subject,
      question: @object.question,
      answer: @object.answer,
    }
  end
end
