from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from devices.views import RoomViewSet, DeviceViewSet, DeviceStateViewSet, DeviceCommandViewSet
from automation.views import AutomationRuleViewSet, AutomationExecutionViewSet, SceneViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'devices', DeviceViewSet, basename='device')
router.register(r'device-states', DeviceStateViewSet, basename='devicestate')
router.register(r'device-commands', DeviceCommandViewSet, basename='devicecommand')
router.register(r'automation-rules', AutomationRuleViewSet, basename='automationrule')
router.register(r'automation-executions', AutomationExecutionViewSet, basename='automationexecution')
router.register(r'scenes', SceneViewSet, basename='scene')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
