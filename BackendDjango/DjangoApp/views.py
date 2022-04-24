from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from DjangoApp.models import Article
from DjangoApp.serializers import ArticleSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def app_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        articles = Article.objects.all()
        
        title = request.GET.get('title', None)
        description = request.GET.get('description',None)
        published = request.GET.get('published')
        print("eeeeee",published)
        if title is not None:
            articles = articles.filter(title__icontains=title)
        if description is not None: 
            articles = articles.filter(description__icontains=description)
        
        articles_serializer = ArticleSerializer(articles, many=True)
        return JsonResponse(articles_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        article_data = JSONParser().parse(request)
        article_serializer = ArticleSerializer(data=article_data)
        if article_serializer.is_valid():
            article_serializer.save()
            return JsonResponse(article_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        