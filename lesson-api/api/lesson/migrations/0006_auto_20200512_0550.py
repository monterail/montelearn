# Generated by Django 2.2.10 on 2020-05-12 05:50

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("lesson", "0005_auto_20200508_0520"),
    ]

    operations = [
        migrations.CreateModel(
            name="Grade",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("uuid", models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Subject",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("uuid", models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
            ],
        ),
        migrations.AlterField(
            model_name="lesson",
            name="grade",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, related_name="grade", to="lesson.Grade"
            ),
        ),
        migrations.AlterField(
            model_name="lesson",
            name="subject",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="subject",
                to="lesson.Subject",
            ),
        ),
    ]
