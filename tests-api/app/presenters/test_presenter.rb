# frozen_string_literal: true

class TestPresenter < Presenter
  def as_json(*)
    {
      uuid: @object.id,
      lesson_uuid: @object.lesson_uuid,
      questions: @object.questions.map { |q| present_question(q) },
    }
  end

  private

  def present_question(question)
    {
      uuid: question.id,
      question_type: question.question_type,
      content: question.content,
      choices: question.choices.map { |c| present_choice(c) },
    }
  end

  def present_choice(choice)
    {
      answer: choice[:answer],
    }
  end
end
