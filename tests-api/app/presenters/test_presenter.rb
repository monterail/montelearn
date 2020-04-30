# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      lesson_uuid: @object.lesson_uuid,
      title: @object.title,
      description: @object.description,
      questions: @object.questions.map { |q| QuestionPresenter.new(q).as_json },
    }
  end
end
