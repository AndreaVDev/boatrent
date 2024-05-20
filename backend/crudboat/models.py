from django.db import models
import locale

class Unavailability(models.Model):
    name = models.CharField(max_length=25)
    startdate = models.DateField()
    enddate = models.DateField()
    
    def __str__(self):
        return self.name


class Holiday(models.Model):
    boatname = models.CharField(max_length=25)
    boatimage = models.ImageField(null=True, blank=True)
    boatdailyprice = models.DecimalField(max_digits=20, decimal_places=2)
    unavailability = models.ManyToManyField(Unavailability)
    
    
    def __str__(self):
        return self.boatname