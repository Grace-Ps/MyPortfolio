from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader


# Create your views here.
def home(request):
    temp = loader.get_template("index.html")
    return HttpResponse(temp.render())

#MyPortfolio