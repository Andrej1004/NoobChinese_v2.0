from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import DetailView
from .models import ParallelText, HanZi
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def index(request):
	return render(request,'main/index.html')

def hanzi_hsk_1(request):
	return render(request,'main/hanzi_hsk_1.html')

def hanzi_hsk_2(request):
	return render(request,'main/hanzi_hsk_2.html')

def hanzi_hsk_3(request):
	return render(request,'main/hanzi_hsk_3.html')

def hanzi_hsk_4(request):
        hanzi = HanZi.objects.all()
        return render(request,'main/hanzi_hsk_4.html',{'hanzi': hanzi})

def kak_uchit_yazuk(request):
	return render(request,'main/kak_uchit_yazuk.html')

def spaced_repetition(request):
	return render(request,'main/spaced_repetition.html')

def words_hsk_1_3(request):
	return render(request,'main/words_hsk_1_3.html')

def reading(request):
        paralleltext = ParallelText.objects.all ()
        return render(request,'main/reading.html',{'paralleltext': paralleltext})

def NatsumeSosekiHeart(request):
        return render(request,'main/NatsumeSosekiHeart.html')

def AddText(request):
        return render(request,'main/AddText.html')
@csrf_exempt
def ShowText(request):
        if request.method == "POST":
                parallelText = ParallelText()
                site_dict = json.loads(request.body)
                parallelText.slug = site_dict['TextName']
                addstring = ""
                for key,value in site_dict['original'].items():
                        addstring += '<span class="text_words" id="'+key+'">'+value+' </span>'
                parallelText.originalText = addstring
                print(addstring)
                addstring = ""
                for key,value in site_dict['translation'].items():
                        addstring += '<span class="text_words" id="'+key+'">'+value+' </span>'
                parallelText.translationText = addstring
                print(addstring)
                parallelText.mapText = site_dict['map_parallel_text']
                parallelText.vocab_map = site_dict['vocab_map_parallel_text']
                parallelText.save()
        return HttpResponse("<h1>Спасибо! Ждите проверки</h1>")

class NewsDetailView(DetailView):
        model = ParallelText
        template_name = 'main/article.html'
        context_object_name = 'paralleltext'
