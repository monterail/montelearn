import factory.fuzzy

from ..models import Grade, Lesson, Subject


class GradeFactory(factory.django.DjangoModelFactory):
    name = factory.fuzzy.FuzzyText(length=50)

    class Meta:
        model = Grade


class SubjectFactory(factory.django.DjangoModelFactory):
    name = factory.fuzzy.FuzzyText(length=50)

    class Meta:
        model = Subject


class LessonFactory(factory.django.DjangoModelFactory):
    name = factory.fuzzy.FuzzyText(length=50)
    description = factory.fuzzy.FuzzyText()
    pdf_file = factory.django.FileField()
    url = factory.fuzzy.FuzzyText(length=300)
    subject = factory.SubFactory(SubjectFactory)
    grade = factory.SubFactory(GradeFactory)

    class Meta:
        model = Lesson
