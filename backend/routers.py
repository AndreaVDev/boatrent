from rest_framework import routers
from crudboat.viewsets import HolidayViewSet
router = routers.SimpleRouter()

router.register(r'holiday', HolidayViewSet, basename='holiday')