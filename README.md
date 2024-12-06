docker run --name forensics-dashboard -e POSTGRES_PASSWORD=root@123 -e POSTGRES_DB=database -p 5432:5432 -d postgres

DATABASE_URL="postgresql://postgres:root@123@localhost:5432/database"

docker start forensics-dashboard
docker stop forensics-dashboard
