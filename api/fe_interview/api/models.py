# pyright: reportMissingTypeStubs = false

from __future__ import annotations

from django.db import models
from django.utils.translation import gettext_lazy as _


class Member(models.Model):
    member_id = models.BigAutoField(_("Member ID"), primary_key=True)
    first_name = models.CharField(_("First name"), max_length=255)
    last_name = models.CharField(_("Last name"), max_length=255)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone"), max_length=10, blank=True)
