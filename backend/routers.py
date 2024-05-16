from rest_framework import routers
from crudboat.viewsets import HolidayViewSet,HolidayAllViewSet
router = routers.SimpleRouter()

router.register(r'holiday', HolidayViewSet, basename='holiday')
router.register(r'holidayall', HolidayAllViewSet, basename='holidayall')