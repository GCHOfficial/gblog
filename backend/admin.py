from django.contrib import admin
from .models import Post, Category, Tag, Comment, SiteConfiguration

admin.site.register(Post)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Comment)
@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'updated_at']
    fields = ['site_name', 'logo_url']

    def has_add_permission(self, request, obj=None):
        return not SiteConfiguration.objects.exists()
