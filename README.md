# biblioteca-api

sudo docker build -t biblioteca-api .

sudo docker run -e MONGODB_URI="mongodb://admin:admin123@[IP]:27017" -p 3000:3000 -d biblioteca-api


