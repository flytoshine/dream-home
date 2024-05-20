from django.db import models
from django.contrib.auth.models import AbstractUser





# Create your models here.
class CustomUser(AbstractUser):
    USER=(
        (1,'ADMIN'),
        (2, 'CONTRACTOR'),
        (3, 'USER'),
    )
    user_type = models.CharField(choices=USER, max_length=50, default=1)
    profile_pic = models.ImageField(upload_to='media/profile_pic')


class Contractor(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    phone = models.IntegerField()
    address = models.TextField()
    dob = models.DateField()
    gender = models.CharField(max_length=100)
    bid = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.admin.first_name + "" + self.admin.last_name

class Users(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    address = models.TextField()
    gender = models.CharField(max_length=100)
    dob = models.DateField()
    phone = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.first_name + "" + self.admin.last_name

class Plan(models.Model):
    name=models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to='media/profile_pic')

class Tender(models.Model):
    name=models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Application(models.Model):
    users = models.ForeignKey(Users, on_delete=models.DO_NOTHING)
    contractor = models.ForeignKey(Contractor, on_delete=models.DO_NOTHING, null=True)
    plan = models.ForeignKey(Plan, on_delete=models.DO_NOTHING, null=True)
    aadhaar = models.CharField(max_length=80, null=True)
    income = models.FileField(upload_to='media/profile_pic')
    possession = models.FileField(upload_to='media/profile_pic')
    landtax = models.FileField(upload_to='media/profile_pic')
    progress = models.CharField(max_length=80, null=True)
    status = models.CharField(max_length=80)