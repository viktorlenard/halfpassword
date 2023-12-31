# Generated by Django 4.2.6 on 2023-12-18 12:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_cryptography.fields


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Password",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=64)),
                ("username", models.CharField(blank=True, max_length=1000, null=True)),
                (
                    "ciphertext",
                    django_cryptography.fields.encrypt(
                        models.CharField(max_length=1000)
                    ),
                ),
                ("url", models.CharField(blank=True, max_length=64)),
                (
                    "tags",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("blue", "blue"),
                            ("red", "red"),
                            ("green", "green"),
                            ("yellow", "yellow"),
                            ("purple", "purple"),
                        ],
                        max_length=10,
                        null=True,
                    ),
                ),
                (
                    "comment",
                    django_cryptography.fields.encrypt(
                        models.TextField(blank=True, null=True)
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_passwords",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
