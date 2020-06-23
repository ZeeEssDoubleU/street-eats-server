# AWS EC2
### the info below will change on each server boot

## connect to instance from CLI
ssh -i ~/.ssh/ec2-street-eats-key-pair.pem ubuntu@ec2-3-21-27-228.us-east-2.compute.amazonaws.com

## create 1GB swapfile
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024 &&  
sudo chmod 600 /swapfile &&  
sudo /sbin/mkswap /swapfile &&  
sudo /sbin/swapon /swapfile
### enable swapfile by default on reboots
sudo vi /etc/fstab  
/swapfile swap swap defaults 0 0