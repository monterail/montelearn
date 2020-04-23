# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      subject: @object.subject,
      question_type: @object.question_type,
      question: @object.question,
      choices: @object.choices,
    }
  end
end
