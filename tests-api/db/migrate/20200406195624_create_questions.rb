# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.belongs_to :test, type: :uuid, foreign_key: true
      t.string :type, index: true, null: false
      t.text :content, null: false
      t.jsonb :options, null: false

      t.timestamps
    end
  end
end
