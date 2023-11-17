cd "C:\Program Files\MongoDB\Server\7.0\bin"

start mongod.exe --logpath "D:\TFG\MongoDB\TFG-Internal Server\logs\log.log" --dbpath "D:\TFG\MongoDB\TFG-Internal Server\data" --port 27017
start mongod.exe --logpath "D:\TFG\MongoDB\TFG-Users Databases\logs\log.log" --dbpath "D:\TFG\MongoDB\TFG-Users Databases\data" --port 30000