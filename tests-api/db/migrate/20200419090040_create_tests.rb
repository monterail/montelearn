# frozen_string_literal: true

class CreateTests < ActiveRecord::Migration[6.0]
  def change
    create_table :tests, id: :uuid do |t|
      t.uuid :lesson_uuid, null: false

      t.timestamps
    end
  end
end
