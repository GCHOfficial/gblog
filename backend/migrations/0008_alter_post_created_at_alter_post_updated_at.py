# Generated by Django 5.0.6 on 2024-06-17 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_post_created_at_post_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
