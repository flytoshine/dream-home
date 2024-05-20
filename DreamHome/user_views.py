from django.shortcuts import render, redirect
from app.models import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required


# Plan
def ADD_APPLICATION(request):
    user_id = Users.objects.get(admin=request.user.id)
    application = Application.objects.filter(users=user_id, status='Added')
    context = {
        'application': application
    }
    if request.method == "POST":
        users = Users.objects.get(admin=request.user.id)
        aadhaar = request.POST.get('aadhaar')
        income = request.FILES.get('income')
        possession = request.FILES.get('possession')
        landtax = request.FILES.get('landtax')

        application = Application(
            users=users,
            aadhaar=aadhaar,
            income=income,
            possession=possession,
            landtax=landtax,
            status='Added'
        )
        application.save()
        messages.success(request, "Details are Successfully Saved !")
        return redirect('add_application')
    return render(request, 'User/add_application.html', context)


def DELETE_APPLICATION(request, id):
    application = Application.objects.filter(id=id)
    application.delete()
    messages.success(request, 'Records are successfully Deleted !')
    return redirect('add_application')


def APPLICATION_STATUS(request):
    user_id = Users.objects.get(admin=request.user.id)
    application = Application.objects.filter(users=user_id).exclude(status='Added')
    plan = Plan.objects.all()

    context = {
        'application': application,
        'plan': plan
    }
    return render(request, 'User/application_status.html', context)


def APPLICATION_PLAN(request):
    if request.method == "POST":
        application_id = request.POST.get('application_id')
        plan = request.POST.get('plan')
        plan_id = Plan.objects.get(id=plan)

        application = Application.objects.get(id=application_id)
        application.plan = plan_id
        application.status = 'Approved, Plan Added, send to contractor'
        application.save()
        messages.success(request, "Plans are Successfully Added !")
        return redirect('application_status')
    return render(request, 'User/application_status.html')


def VIEW_PLAN(request):
    plan = Plan.objects.all()

    context = {
        'plan': plan
    }
    return render(request, 'User/view_plan.html', context)
