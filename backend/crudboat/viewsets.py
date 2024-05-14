from rest_framework import viewsets
from crudboat.models import Holiday, Unavailability
from crudboat.serializers import HolidaySerializer,  UnavailabilitySerializer
from rest_framework.response import Response
from datetimerange import DateTimeRange
from datetime import datetime
import json

class HolidayViewSet(viewsets.ModelViewSet):
    serializer_class = HolidaySerializer
        
    #def get_queryset(self):
        #return Holiday.objects.all()

    queryset  = Holiday.objects.all()

    def list(self, request, *args, **kwargs):
        # call the original 'list' to get the original response.
        response_data = super(HolidayViewSet, self).list(request, *args, **kwargs)
        requested_startdate_str = request.query_params.get('startdate')
        requested_startdate = datetime.strptime(requested_startdate_str, '%Y-%m-%d')
        requestedenddate_str = request.query_params.get('enddate')
        requestedenddate = datetime.strptime(requestedenddate_str, '%Y-%m-%d')
        holiday_list  = Holiday.objects.all()
        resp_data = []
        for hol in holiday_list:
            boat_name = hol.boatname
            boat_price = hol.boatdailyprice
            for d in hol.unavailability.all():
                un_startdate = d.startdate
                un_enddate = d.enddate
                print(f"Start date {un_startdate}")
                print(f"End date {un_enddate}")
                
                dtr1 = DateTimeRange(requested_startdate, requestedenddate)
                dtr2 = DateTimeRange(un_startdate, un_enddate)
                if dtr1 not in dtr2:
                    holiday_duration = requestedenddate - requested_startdate 
                    print(holiday_duration.days)
                    price_total = float(holiday_duration.days * boat_price)
                    print(price_total)
                    print("Available Boat")
                    resp_data.append({"boat_name":boat_name, "price_total":price_total})
        
        for record in resp_data:
            print(record)
       
        final = json.dumps(resp_data, indent = 2)
        print(final)
        
        data = {
              "status": 0,
              "message": "Success",
              "data": {
                      "updatedAt": "2020-08-31 17:49:15",
                      "serverTime": "2022-03-23 15:10:11",
              "news": [{
                        "id": obj['id'],
                        "boatname": obj['boatname'],
                          } for obj in response_data.data]
                      }
            }

        return Response(final)