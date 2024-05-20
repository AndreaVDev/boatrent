from rest_framework import serializers
from crudboat.models import Holiday, Unavailability

class UnavailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Unavailability
        fields = '__all__'   
    
    
class HolidaySerializer(serializers.ModelSerializer):
    
    image_url = serializers.SerializerMethodField('get_boatimage_url')

    class Meta:
        model = Holiday
        fields = '__all__'

        
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["unavailability"] = UnavailabilitySerializer(instance.unavailability.all(), many=True).data
        return rep


    def get_boatimage_url(self, holiday):
        return holiday.boatimage.url if holiday.boatimage else ''
    
    