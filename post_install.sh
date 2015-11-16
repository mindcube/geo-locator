echo '*** Setting up local django install'
sudo su - postgres -c "createdb vagrant;"
sudo su - postgres -c "psql -c \"CREATE USER vagrant WITH PASSWORD 'vagrant'\""
sudo su - postgres -c "psql -c 'ALTER USER vagrant CREATEDB;'"
echo "source /var/www/.virtualenv/vagrant/bin/activate" >> ~/.bashrc
echo "cd /var/www" >> ~/.bashrc
source /var/www/.virtualenv/vagrant/bin/activate
cd /var/www
./manage.py migrate
echo "*** Setting up django superuser"
./manage.py createsuperuser
