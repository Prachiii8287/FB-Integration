# Generated by Django 5.0.2 on 2025-06-12 10:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_department_head_of_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='department',
            name='head_of_department',
        ),
    ]
