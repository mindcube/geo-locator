# Simple geo locater django app

This is a simple application that will detect users' latitude and logitude, and display in on a Google map.

Demo: <https://blooming-basin-5924.herokuapp.com/>

## Project Requirements
- looking for coding style
- test coverage
- usage instructions
- check in code in github with clear README on how to deploy/use
- use python 3.0
- use any high level framework for python django,flash,tornado
- use any javascript libraries as needed for frontend

**Utilizes the following APIs:**

- Google Maps API
- Maxmind Lite GeoLookup database for server based IP geo locating
- Google Places API for autocomplete lookups

**Stack for quick spin ups:**

- Django/Postgres
- Python 3
- Bootstrap

### Project Setup
To run a local development environment, you *must* have virtualbox and vagrant installed.

- **Virtualbox** can be downloaded from <https://www.virtualbox.org/wiki/Downloads>
- **Vagrant** can be downloaded from <https://www.vagrantup.com/downloads.html>

**Setup Steps:**

1. `cd` into project directory
2. `vagrant up`
3. `ssh vagrant` (this will log you into the virtual machine)
4. `/var/www/postinstall.sh`
5. `/var/www/mange.py runserver [::]:8000`
6. Browse to <http://localhost:8000> to view application

**Testing:**

1. `vagrant ssh`
2. `cd /var/www`
3. `./manage.py test`


