# frozen_string_literal: true

class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers, id: :uuid do |t|
      t.string :value, null: false
      t.boolean :correct, null: false
      t.belongs_to :question, null: false, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end
