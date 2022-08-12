from django.db import models

# Create your models here.
class ParallelText (models.Model):
        slug = models.TextField('название',default='название')
        originalText = models.TextField('оригинал',default='оригинал')
        translationText = models.TextField('перевод',default='перевод')
        mapText = models.TextField('мап',default='мап')
        vocab_map = models.TextField('словарь',default='словарь')
        showOnSite = models.BooleanField('Показывать на сайте',default=False)

class HanZi (models.Model):
        character = models.TextField('иероглиф',default='')
        reading = models.TextField('чтение',default='')
        translation = models.TextField('перевод',default='')
