from django.urls import re_path as url
from DjangoApp import views 
 
urlpatterns = [ 
    url(r'^api/apps$', views.app_list),
]