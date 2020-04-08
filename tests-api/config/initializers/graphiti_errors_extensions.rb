# frozen_string_literal: true

module GraphitiErrors
  module Validation
    module SerializerExtensions
      def pointer_for(object, name)
        nested_attributes = name.to_s.split(".")
        if attribute?(nested_attributes.first)
          "/data/attributes/#{nested_attributes.join("/")}"
        else
          super(object, name)
        end
      end
    end

    class Serializer
      prepend SerializerExtensions
    end
  end
end
