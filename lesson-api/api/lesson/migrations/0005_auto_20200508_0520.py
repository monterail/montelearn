# Generated by Django 2.2.10 on 2020-05-08 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("lesson", "0004_auto_20200506_0529"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lesson",
            name="grade",
            field=models.CharField(
                blank=True,
                choices=[
                    ("preschool", "preschool"),
                    ("kindergarden", "kindergarden"),
                    ("first grade", "first grade"),
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
    ]
