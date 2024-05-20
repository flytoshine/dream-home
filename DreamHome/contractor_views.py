from django.shortcuts import render,redirect
from app.models import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required

#Application
def VIEW_APPLICATION(request):
    application = Application.objects.filter(status='Approved, Plan Added, send to contractor')

    context = {
        'application': application,
    }
    return render(request, 'Contractor/view_application.html', context)

def ACCEPT_APPLICATION(request):
    if request.method == "POST":
        contractor_id = Contractor.objects.get(admin=request.user.id)
        application_id = request.POST.get('application_id')
        progress = request.POST.get('progress')

        application = Application.objects.get(id=application_id)
        application.contractor = contractor_id
        application.progress = progress
        application.status = 'Accepted by Contractor'
        application.save()
        messages.success(request, "Progress are Successfully Added !")
        return redirect('contractor_application_status')
    return render(request, 'Contractor/application_status.html')

def APPLICATION_STATUS(request):
    contractor_id = Contractor.objects.get(admin=request.user.id)
    application = Application.objects.filter(contractor=contractor_id).exclude(progress=None)

    context = {
        'application': application,
    }
    return render(request, 'Contractor/application_status.html', context)

def UPDATE_APPLICATION_PROGRESS(request):
    if request.method == "POST":
        application_id = request.POST.get('application_id')
        progress = request.POST.get('progress')

        application = Application.objects.get(id=application_id)
        application.progress = progress
        application.save()
        messages.success(request, "Progress updations are Successfully Added !")
        return redirect('contractor_application_status')
    return render(request, 'Contractor/application_status.html')

