# frozen_string_literal: true

class QuestionPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      question_type: @object.question_type,
      content: @object.content,
      choices: @object.choices,
    }
  end
end
