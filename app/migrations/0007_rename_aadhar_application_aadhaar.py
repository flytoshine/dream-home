# Generated by Django 4.2 on 2023-05-12 22:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_application_aadhar_alter_application_progress'),
    ]

    operations = [
        migrations.RenameField(
            model_name='application',
            old_name='aadhar',
            new_name='aadhaar',
        ),
    ]