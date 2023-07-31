from datetime import datetime

from django.db.models import Sum
from django.http import JsonResponse
from django.shortcuts import render

from .models import Produto, Vendas, Vendedor


# Home view
def home(request):
    return render(request, "home.html")


# Get total sales
def getTotalSales(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET method required."})

    total = Vendas.objects.all().aggregate(Sum("total"))["total__sum"]
    return JsonResponse({"total": total})


# Get total sales through the last 12 months
def getAnnualSalesReport(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET method required."})

    totalSales = Vendas.objects.all()
    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    data = []
    labels = []
    month = datetime.now().month + 1
    year = datetime.now().year
    for i in range(12):
        month -= 1
        if month == 0:
            month = 12
            year -= 1
        monthlySales = sum(
            [
                i.total
                for i in totalSales
                if i.data.month == month and i.data.year == year
            ]
        )
        labels.append(months[month - 1])
        data.append(monthlySales)

    data_json = {"data": data[::-1], "labels": labels[::-1]}

    return JsonResponse(data_json)


# Get the top 3 products
def getTop3Products(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET method required."})

    products = Produto.objects.all()
    label = []
    data = []
    for product in products:
        sales = Vendas.objects.filter(nome_produto=product).aggregate(Sum("total"))
        if not sales["total__sum"]:
            sales["total__sum"] = 0
        label.append(product.nome)
        data.append(sales["total__sum"])

    productsList = list(zip(data, label))

    productsList.sort(key=lambda productsList: productsList[1], reverse=True)
    productsList = list(zip(*productsList))

    return JsonResponse({"labels": productsList[1][:3], "data": productsList[0][:3]})


# Get the top 3 sellers
def getTop3Sellers(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET method required."})

    sellers = Vendedor.objects.all()
    label = []
    data = []
    for seller in sellers:
        sales = Vendas.objects.filter(vendedor=seller).aggregate(Sum("total"))
        if not sales["total__sum"]:
            sales["total__sum"] = 0
        label.append(seller.nome)
        data.append(sales["total__sum"])

    sellersList = list(zip(data, label))

    sellersList.sort(key=lambda sellersList: sellersList[1], reverse=True)
    sellersList = list(zip(*sellersList))

    return JsonResponse({"labels": sellersList[0][:3], "data": sellersList[1][:3]})
