from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader


# Create your views here.
def home(request):
    temp = loader.get_template("index.html")
    return HttpResponse(temp.render())

#MyPortfolio

def game_page(request, game_id):
    Result = {0:'game_page.html',1:'TicTacToe.html',2:'memory_flip.html',3:'Typing_speed.html'}
    return render(request, Result[game_id], {'game_id': game_id})

