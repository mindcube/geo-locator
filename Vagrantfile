# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
    ## Box
    config.vm.box = "ubuntu/trusty64"

    ## Networking
    config.vm.network :forwarded_port, guest: 8000, host: 8000 # local dev
    config.vm.network :forwarded_port, guest: 5432, host: 5432 # postgresql
    config.vm.network "public_network"

    config.ssh.forward_agent = true
    ## Shares
    config.vm.synced_folder "./", "/var/www/"


    ## Box Specs
    config.vm.provider "virtualbox" do |v|
      v.name = "geo-locator"
      v.customize ["modifyvm", :id, "--cpus", "1"] # Never more than 1. http://bit.ly/1qfl0PD
      v.customize ["modifyvm", :id, "--memory", "2048"]
      v.customize ["modifyvm", :id, "--ioapic", "on"]
    end

    config.vm.provision "shell", inline: <<-SHELL
        sudo apt-get update
        sudo apt-get upgrade
        sudo apt-get install -y git postgresql postgresql-contrib libpq-dev python3-dev python3 python3-doc curl;
        echo '*** Installing nodejs'
        curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash
        sudo apt-get install -y nodejs;
        echo '*** Installing pip'
        wget https://bootstrap.pypa.io/get-pip.py --output-document=get-pip.py; chmod +x get-pip.py; python get-pip.py
        echo '*** Installing virtualenv'
        sudo pip install virtualenv;
        echo '*** Creating virtual enviornment'
        mkdir /var/www/.virtualenv; virtualenv --python=/usr/bin/python3 /var/www/.virtualenv/vagrant; source /var/www/.virtualenv/vagrant/bin/activate
        echo '*** Installing os dependencies'
        cd /var/www; sudo ./install_os_dependencies.sh install;
        echo '*** Installing python dependencies'
        ./install_python_dependencies.sh;
        echo '*** Installing c extension for maxmind db reader'
        sudo add-apt-repository -y ppa:maxmind/ppa
        sudo aptitude update; sudo aptitude install libmaxminddb0 libmaxminddb-dev mmdb-bin;
    SHELL
end