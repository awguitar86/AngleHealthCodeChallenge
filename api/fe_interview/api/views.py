# pyright: reportMissingTypeStubs = false

from __future__ import annotations

from rest_framework.viewsets import ModelViewSet

from .models import Member
from .serializers import MemberSerializer


class MemberViewSet(ModelViewSet):
    """"""

    queryset = Member.objects.all()
    serializer_class = MemberSerializer
