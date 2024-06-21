from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('task', views.task, name='task'),
    path('boost/', views.boost, name='boost'),
    path('friends/', views.friends, name='friends')
]