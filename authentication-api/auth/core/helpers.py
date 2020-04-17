from collections import OrderedDict

from rest_framework_json_api.renderers import JSONRenderer

from django.utils import encoding


class CustomUserJSONRenderer(JSONRenderer):
    @classmethod
    def build_json_resource_obj(
        cls, fields, resource, resource_instance, resource_name, force_type_resolution=False
    ):
        """
        Adjust the resource_instance containing both {"token: "", "user": UserObject}
        Get pk value from user object: resource_instance["user"].pk)
        """
        resource_data = [
            ("type", resource_name),
            ("id", encoding.force_str(resource_instance["user"].pk) if resource_instance else None),
            ("attributes", cls.extract_attributes(fields, resource)),
        ]
        return OrderedDict(resource_data)
