from rest_framework import viewsets
from .models import Holiday, Unavailability
from .serializers import HolidaySerializer, UnavailabilitySerializer
from rest_framework.response import Response
from datetimerange import DateTimeRange
from datetime import datetime
from django.db.models import Q

import json
import base64
from . import utilprj


class HolidayViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer

    def get_queryset(self):
        self.request.query_params.get('startdate') and self.request.query_params.get('enddate')
        requested_startdate_str = self.request.query_params.get('startdate')
        requested_startdate = datetime.strptime(requested_startdate_str, '%Y-%m-%d')

        requestedenddate_str = self.request.query_params.get('enddate')
        requestedenddate = datetime.strptime(requestedenddate_str, '%Y-%m-%d')

        queryset = Holiday.objects.filter(Q(unavailability__startdate__gt=requestedenddate) |
                                          Q(unavailability__enddate__lt=requested_startdate))
        if queryset:
            return queryset

        return "No holidays available"


class HolidayAllViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer

    def get_queryset(self):
        return Holiday.objects.all()
