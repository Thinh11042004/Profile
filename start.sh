#!/bin/sh

# Set correct permissions
mkdir -p /run/mysqld
chown -R mysql:mysql /run/mysqld
chown -R mysql:mysql /var/lib/mysql || true

# Initialize MariaDB if it has not been initialized
if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing database..."
    mysql_install_db --user=mysql --datadir=/var/lib/mysql > /var/log/mysql_install.log 2>&1
fi

# Start MariaDB in background
echo "Starting MariaDB server..."
/usr/bin/mysqld --user=mysql --datadir=/var/lib/mysql --skip-networking=0 > /var/log/mysqld.log 2>&1 &
MYSQL_PID=$!

# Wait for MariaDB to be ready
echo "Waiting for MariaDB to start..."
timeout=30
while ! mysqladmin ping --silent; do
    if ! kill -0 $MYSQL_PID 2>/dev/null; then
        echo "MariaDB process died! Here are the logs:"
        cat /var/log/mysqld.log
        exit 1
    fi
    sleep 1
    timeout=$((timeout - 1))
    if [ "$timeout" -le 0 ]; then
        echo "Timeout waiting for MariaDB to start!"
        cat /var/log/mysqld.log
        exit 1
    fi
done

echo "MariaDB started."
# Setup root user and create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS portfolio;"
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';"
mysql -u root -e "FLUSH PRIVILEGES;"

echo "Starting NestJS application..."
cd /app
# Start the Node process handling our backend + statically serving frontend
exec node --max-old-space-size=256 dist/main
