from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from DjangoApp.models import Article
from DjangoApp.serializers import ArticleSerializer
from rest_framework.decorators import api_view
from pymongo import MongoClient 
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
client = MongoClient('mongodb+srv://soumaya:soumaya1Atlas@cluster0.y9xab.mongodb.net/test?retryWrites=true&w=majority')
db = client['DjangoDB']
collection =  db['NFT_sales']



@api_view(['GET', 'POST', 'DELETE'])
def app_list(request):
    if request.method == 'GET':
        docs=collection.find({"Number_of_Sales": {"$eq": 5}})
        # articles = Article.objects.all()
        
        date = request.GET.get('date', None)
        # description = request.GET.get('description',None)
        # published = request.GET.get('published')
        # print("eeeeee",published)
        if date is not None:
            docs = collection.find({"Date": date})
        # if description is not None: 
        #     articles = articles.filter(description__icontains=description)
        
        # articles_serializer = ArticleSerializer(articles, many=True)
        data = json.loads(dumps(docs)) 
        return JsonResponse(data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        article_data = JSONParser().parse(request)
        article_serializer = ArticleSerializer(data=article_data)
        if article_serializer.is_valid():
            article_serializer.save()
            return JsonResponse(article_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        