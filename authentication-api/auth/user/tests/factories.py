import factory
import factory.fuzzy

from ..models import Score, User


class ScoreFactory(factory.django.DjangoModelFactory):
    test_uuid = factory.fuzzy.FuzzyText(length=50)
    score = factory.fuzzy.FuzzyInteger(low=0)
    max_score = factory.fuzzy.FuzzyInteger(low=0)

    class Meta:
        model = Score


class UserFactory(factory.django.DjangoModelFactory):
    first_name = factory.fuzzy.FuzzyText(length=12)
    last_name = factory.fuzzy.FuzzyText(length=12)
    email = factory.LazyAttribute(lambda user: "{}@example.com".format(user.first_name))

    @factory.post_generation
    def scores(self, create, scores, **kwargs):
        if not create:
            return
        if scores:
            for score in scores:
                self.scores.append(score)

    class Meta:
        model = User
