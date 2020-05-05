# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      lesson_uuid: @object.lesson_uuid,
      questions: @object.questions.map { |q| QuestionPresenter.new(q).as_json },
    }
  end
end
