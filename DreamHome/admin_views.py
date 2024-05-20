from django.shortcuts import render,redirect
from app.models import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def HOME(request):
    return render(request,'Admin/application_status.html')

@login_required(login_url='/')

# Contractor Modules
def VIEW_REGISTERED_CONTRACTOR(request):
    contractor = Contractor.objects.filter(status='Added')

    context = {
        'contractor': contractor,
    }
    return render(request, 'Admin/view_regd_contractor.html', context)


def VIEW_APPROVED_CONTRACTOR(request):
    contractor = Contractor.objects.filter(status='Approved')

    context = {
        'contractor': contractor,
    }
    return render(request, 'Admin/view_approved_contractor.html', context)


def APPROVE_CONTRACTOR(request, admin):
    contractor = Contractor.objects.get(id=admin)
    contractor.status = 'Approved'
    contractor.save()
    messages.success(request, 'Approved Successfully !')

    return redirect('view_approved_contractor')


def REJECT_CONTRACTOR(request, admin):
    contractor = Contractor.objects.get(id=admin)
    contractor.status = 'Reject'
    contractor.save()
    messages.warning(request, 'Access Rejected !')

    return redirect('view_regd_contractor')


def DELETE_CONTRACTOR(request, admin):
    contractor = CustomUser.objects.get(id=admin)
    contractor.delete()
    messages.warning(request, 'Successfully Removed !')

    return redirect('view_regd_contractor')

#Plan
def ADD_PLAN(request):
    if request.method == "POST":
        name = request.POST.get('name')
        description = request.POST.get('description')
        photo = request.FILES.get('photo')

        plan = Plan(
            name = name,
            description = description,
            image = photo
        )
        plan.save()
        messages.success(request, "Details of" + plan.name + " are Successfully Saved !")
        return redirect('view_plan')
    return render(request,'Admin/add_plan.html')


def VIEW_PLAN(request):
    plan = Plan.objects.all()

    context={
        'plan':plan
    }
    return render(request,'Admin/view_plan.html', context)


def EDIT_PLAN(request, id):
    plan = Plan.objects.filter(id=id)

    context = {
        'plan': plan
    }
    return render(request, 'Admin/edit_plan.html', context)


def UPDATE_PLAN(request):
    if request.method=="POST":
        plan_id = request.POST.get('plan_id')
        name = request.POST.get('name')
        description = request.POST.get('description')
        photo = request.FILES.get('photo')

        plan = Plan.objects.get(id=plan_id)
        plan.name=name
        plan.description = description
        if photo != None and photo != "":
            plan.image = photo
        plan.save()
        messages.success(request, "records of" + " " + plan.name + "are succesfully updated !")
        return redirect('view_plan')
    return render(request, 'Admin/edit_plan.html')


def DELETE_PLAN(request,id):
    items = Plan.objects.filter(id=id)
    items.delete()
    messages.success(request, 'Records are successfully Deleted !')
    return redirect('view_plan')

#Tender
def ADD_TENDER(request):
    tender = Tender.objects.all()

    context={
        'tender':tender
    }
    if request.method == "POST":
        name = request.POST.get('name')
        description = request.POST.get('description')

        tender = Tender(
            name = name,
            description = description,
        )
        tender.save()
        messages.success(request, "Details of" + tender.name + " are Successfully Saved !")
        return redirect('add_tender')
    return render(request,'Admin/add_tender.html', context)

def DELETE_TENDER(request,id):
    tender = Tender.objects.filter(id=id)
    tender.delete()
    messages.success(request, 'Records are successfully Deleted !')
    return redirect('add_tender')


#Application
def VIEW_APPLICATION(request):
    application = Application.objects.filter(status='Added')

    context = {
        'application': application,
    }
    return render(request, 'Admin/view_application.html', context)

def APPROVE_APPLICATION(request, id):
    application = Application.objects.get(id=id)
    application.status = 'Approved'
    application.save()
    messages.success(request, 'Approved Successfully !')

    return redirect('admin_application_status')

def REJECT_APPLICATION(request, id):
    application = Application.objects.get(id=id)
    application.status = 'Reject'
    application.save()
    messages.warning(request, 'Access Rejected !')

    return redirect('admin_view_application')

def APPLICATION_STATUS(request):
    application = Application.objects.exclude(status='Added')
    context = {
        'application': application
    }
    return render(request, 'Admin/application_status.html', context)
