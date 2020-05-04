# Generated by Django 2.2.10 on 2020-04-30 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("lesson", "0002_lesson_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="lesson",
            name="grade",
            field=models.CharField(
                blank=True,
                choices=[
                    ("preschool", "preschool"),
                    ("kindergarden", "kindergarden"),
                    ("frist grade", "frist grade"),
                    ("second grade", "second grade"),
                    ("third grade", "third grade"),
                    ("fourth grade", "fourth grade"),
                    ("fifth grade", "fifth grade"),
                    ("sixth grade", "sixth grade"),
                    ("seventh grade", "seventh grade"),
                    ("eighth grade", "eighth grade"),
                    ("high school", "high school"),
                    ("university", "university"),
                ],
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name="lesson",
            name="subject",
            field=models.CharField(
                blank=True,
                choices=[
                    ("biology", "biology"),
                    ("maths", "maths"),
                    ("physics", "physics"),
                    ("chemistry", "chemistry"),
                    ("geography", "geography"),
                    ("history", "history"),
                    ("economics", "economics"),
                    ("business studies", "business studies"),
                    ("art", "art"),
                    ("music", "music"),
                    ("computer science", "computer science"),
                ],
                max_length=50,
            ),
        ),
    ]
