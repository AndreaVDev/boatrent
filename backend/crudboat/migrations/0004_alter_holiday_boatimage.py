# Generated by Django 5.0.6 on 2024-05-17 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudboat', '0003_remove_holiday_unavailability_holiday_unavailability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holiday',
            name='boatimage',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
