from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('hanzi_hsk_1', views.hanzi_hsk_1, name='hanzi_hsk_1'),
    path('hanzi_hsk_2', views.hanzi_hsk_2, name='hanzi_hsk_2'),
    path('hanzi_hsk_3', views.hanzi_hsk_3, name='hanzi_hsk_3'),
    path('kak_uchit_yazuk', views.kak_uchit_yazuk, name='kak_uchit_yazuk'),
    path('spaced_repetition', views.spaced_repetition, name='spaced_repetition'),
    path('words_hsk_1_3', views.words_hsk_1_3, name='words_hsk_1_3'),
    path('reading', views.reading, name='reading'),
    path('reading/NatsumeSosekiHeart', views.NatsumeSosekiHeart, name='NatsumeSosekiHeart'),
    path('reading/AddText/', views.AddText, name='AddText'),
    path('ShowText', views.ShowText),
    path('<str:slug>',views.NewsDetailView.as_view(), name='article'),
]
