# pyright: reportMissingTypeStubs = false

from __future__ import annotations

from rest_framework.fields import RegexField
from rest_framework.serializers import ModelSerializer

from .models import Member


class MemberSerializer(ModelSerializer):
    phone = RegexField(r"\d{10}", required=False, default="", allow_blank=True)

    class Meta:
        model = Member
        fields = "__all__"
