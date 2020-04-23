# frozen_string_literal: true

class CreateTests < ActiveRecord::Migration[6.0]
  def change
    create_table :tests, id: :uuid do |t|
      t.uuid :lesson_id
      t.string :question_type, null: false
      t.string :subject, null: false
      t.text :question, null: false
      t.text :choices, null: false

      t.timestamps
    end
  end
end
