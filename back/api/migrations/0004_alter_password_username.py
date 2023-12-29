# Generated by Django 4.2.6 on 2023-12-29 00:05

from django.db import migrations, models
import django_cryptography.fields


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_remove_password_ciphertext_password_is_favorite_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="password",
            name="username",
            field=django_cryptography.fields.encrypt(
                models.CharField(blank=True, max_length=1000, null=True)
            ),
        ),
    ]
