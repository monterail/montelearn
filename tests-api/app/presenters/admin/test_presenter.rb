# frozen_string_literal: true

module Admin
  class TestPresenter < ::TestPresenter
    private

    def present_choice(choice)
      {
        answer: choice[:answer],
        correct: choice[:correct],
      }
    end
  end
end
