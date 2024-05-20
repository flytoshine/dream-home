"""
URL configuration for FoodCourtAutomation project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views, admin_views, contractor_views, user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('base/', views.BASE, name='base'),
    path('', views.LANDING, name='landing'),
    path('SignUp/User', views.ADD_USER, name='add_user'),
    path('SignUp/Contractor', views.ADD_CONTRACTOR, name='add_contractor'),


    # login_Path
    path('login', views.LOGIN, name='login'),
    path('doLogin', views.doLogin, name='doLogin'),
    path('doLogout', views.doLogout, name='doLogout'),

    # profile update
    path('profile', views.PROFILE, name='profile'),
    path('profile/update', views.PROFILE_UPDATE, name='profile_update'),

#---ADMIN URLS----#
    path('Admin/Home', admin_views.HOME, name='admin_home'),

#Contractor URLS
    path('ADMIN/Contractor/Registered', admin_views.VIEW_REGISTERED_CONTRACTOR, name='view_regd_contractor'),
    path('ADMIN/Contractor/Approved', admin_views.VIEW_APPROVED_CONTRACTOR, name='view_approved_contractor'),
    path('ADMIN/Contractor/Approve/<str:admin>', admin_views.APPROVE_CONTRACTOR, name='approve_contractor'),
    path('ADMIN/Contractor/Reject/<str:admin>', admin_views.REJECT_CONTRACTOR, name='reject_contractor'),
    path('ADMIN/Contractor/Delete/<str:admin>', admin_views.DELETE_CONTRACTOR, name='delete_contractor'),

#Plan URLS
    path('Admin/Plans/Add', admin_views.ADD_PLAN, name='add_plan'),
    path('Admin/Plans/View', admin_views.VIEW_PLAN, name='view_plan'),
    path('Admin/Plans/Edit/<str:id>', admin_views.EDIT_PLAN, name='edit_plan'),
    path('Admin/Plans/Update', admin_views.UPDATE_PLAN, name='update_plan'),
    path('Admin/Plans/Delete/<str:id>', admin_views.DELETE_PLAN, name='delete_plan'),

#Tender URLS
    path('Admin/Tender/Add', admin_views.ADD_TENDER, name='add_tender'),
    path('Admin/Tender/Delete/<str:id>', admin_views.DELETE_TENDER, name='delete_tender'),

#Appication URLS
    path('Admin/Application/Add', admin_views.VIEW_APPLICATION, name='admin_view_application'),
    path('Admin/Application/Approve/<str:id>', admin_views.APPROVE_APPLICATION, name='approve_application'),
    path('Admin/Application/Reject/<str:id>', admin_views.REJECT_APPLICATION, name='reject_application'),
    path('Admin/Application/Status', admin_views.APPLICATION_STATUS, name='admin_application_status'),


#---USERS MODULE---#

#Appication URLS
    path('Contractor/Application/View', contractor_views.VIEW_APPLICATION, name='contractor_view_application'),
    path('Contractor/Application/Accept', contractor_views.ACCEPT_APPLICATION, name='contractor_accept_application'),
    path('Contractor/Application/UpdateProgress', contractor_views.UPDATE_APPLICATION_PROGRESS, name='update_progress'),
    path('Contractor/Application/Status', contractor_views.APPLICATION_STATUS, name='contractor_application_status'),

#---USERS MODULE---#

#Appication URLS
    path('User/Application/Add', user_views.ADD_APPLICATION, name='add_application'),
    path('User/Application/Delete/<str:id>', user_views.DELETE_APPLICATION, name='delete_application'),
    path('User/Application/Status', user_views.APPLICATION_STATUS, name='application_status'),
    path('User/Application/Plan', user_views.APPLICATION_PLAN, name='application_plan'),

    path('User/Plans/View', user_views.VIEW_PLAN, name='user_view_plan'),




] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)