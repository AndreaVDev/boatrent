from rest_framework import viewsets
from crudboat.models import Holiday, Unavailability
from crudboat.serializers import HolidaySerializer,  UnavailabilitySerializer
from rest_framework.response import Response
from datetimerange import DateTimeRange
from datetime import datetime
import json
import base64


class HolidayViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer
        
    #def get_queryset(self):
        #return Holiday.objects.all()

    queryset  = Holiday.objects.all()

    def list(self, request, *args, **kwargs):
        # call the original 'list' to get the original response.
        response_data = super(HolidayViewSet, self).list(request, *args, **kwargs)
        if request.query_params.get('startdate') and request.query_params.get('enddate'):
            requested_startdate_str = request.query_params.get('startdate')
            requested_startdate = datetime.strptime(requested_startdate_str, '%Y-%m-%d')
            requestedenddate_str = request.query_params.get('enddate')
            requestedenddate = datetime.strptime(requestedenddate_str, '%Y-%m-%d')
            reqdt = requested_startdate.date()
            reqet = requestedenddate.date()
            holiday_list  = Holiday.objects.all()
            resp_data = []
            for hol in holiday_list:
                boat_name = hol.boatname
                boat_price = hol.boatdailyprice
                for d in hol.unavailability.all():
                    un_startdate = d.startdate
                    un_enddate = d.enddate
                    
                    dtr1 = DateTimeRange(reqdt, reqet)
                    
                    dtr2 = DateTimeRange(un_startdate, un_enddate)
                   
                    if  (reqet <= un_startdate or reqdt >= un_enddate):
                        holiday_duration = requestedenddate - requested_startdate 
                        price_total = float(holiday_duration.days * boat_price)
                        encoded_image = ''
                        if hol.boatimage:
                            encoded_base64 = base64.b64encode(hol.boatimage.file.read()) # return bytes
                            encoded_image = encoded_base64.decode('utf-8')    
                        resp_data.append({"boat_name":boat_name, "price_total":price_total, "boat_image":encoded_image})
                    else:
                        print("No availability")
            
           
                
        
            final = json.dumps(resp_data)
    

            return Response(final)
        else:
            data = {
                "status": 0,
                "message": "No slots for the selected period"}

            return Response("No slot")


class HolidayAllViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer
    
    def get_queryset(self):
        return Holiday.objects.all()