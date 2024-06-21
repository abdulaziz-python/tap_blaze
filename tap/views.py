from django.shortcuts import render


def home(request):
    return render(request, 'home.html')

def task(request):
    return render(request, 'task.html')

def friends(request):
    return render(request, 'friend.html')

def boost(request):
    return render(request, 'boost.html')