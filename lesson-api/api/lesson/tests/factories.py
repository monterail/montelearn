import factory.fuzzy

from ..models import Lesson


class LessonFactory(factory.django.DjangoModelFactory):
    name = factory.fuzzy.FuzzyText(length=50)
    description = factory.fuzzy.FuzzyText()
    pdf_file = factory.django.FileField()
    url = factory.fuzzy.FuzzyText(length=300)

    class Meta:
        model = Lesson
