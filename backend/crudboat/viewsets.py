from rest_framework import viewsets
from crudboat.models import Holiday, Unavailability
from crudboat.serializers import HolidaySerializer,  UnavailabilitySerializer
    
class HolidayViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer
        
    def get_queryset(self):
        return Holiday.objects.all()