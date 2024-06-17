from django.db import models
from django.conf import settings
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=50)
    
    
class Tag(models.Model):
    name = models.CharField(max_length=20)

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete = models.CASCADE, related_name='post', null=True)
    tags = models.ManyToManyField(Tag, related_name='post')
    
    def publish(self):
        self.published_date = timezone.now()
        self.save()     
        
    def __str__(self):      
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment')
    author  = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text    = models.TextField()    
    created = models.DateTimeField(auto_now_add=True)