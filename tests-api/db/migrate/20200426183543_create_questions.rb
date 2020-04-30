# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.belongs_to :test, null: false, type: :uuid, foreign_key: true
      t.string :question_type, null: false
      t.text :content, null: false
      t.text :choices, null: false

      t.timestamps
    end
  end
end
