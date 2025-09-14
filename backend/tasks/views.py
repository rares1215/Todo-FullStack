from django.shortcuts import render
from .models import Task
from django.contrib.auth.models import User
from .serializers import UserSerializer,TaskSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.

### View for creating and showing the list of tasks####

class TaskListView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        return Task.objects.filter(author = current_user, completed=False).order_by("-created_at")

    def perform_create(self,serializer):
        current_user = self.request.user
        serializer.save(author = current_user)

### View for getting,deleting,editing a task#####

class EditDeleteTaskView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)
    
### View to filter completed tasks

class TaskCompletedView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user, completed = True)



#### View for register User###


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]