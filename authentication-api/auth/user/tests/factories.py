import factory
import factory.fuzzy

from ..models import User


class UserFactory(factory.django.DjangoModelFactory):
    first_name = factory.fuzzy.FuzzyText(length=12)
    last_name = factory.fuzzy.FuzzyText(length=12)
    email = factory.LazyAttribute(lambda user: "{}@example.com".format(user.first_name))

    class Meta:
        model = User
