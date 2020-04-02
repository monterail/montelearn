# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.string :question_type, null: false
      t.string :value, null: false
      t.belongs_to :test, null: false, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end
