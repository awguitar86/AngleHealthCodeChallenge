# pyright: reportMissingTypeStubs = false

from __future__ import annotations

from rest_framework.routers import SimpleRouter

from .views import MemberViewSet

router = SimpleRouter(trailing_slash=False)
router.register("members", MemberViewSet, basename="member")
urlpatterns = router.urls
