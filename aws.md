<!-- AWS EC2 -->
<!-- the info below will change on each server boot -->
<!-- connect to instance -->
ssh -i ~/.ssh/ec2-street-eats-key-pair.pem ubuntu@ec2-3-21-27-228.us-east-2.compute.amazonaws.com

<!-- create 1gb swapfile -->
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024 &&
sudo chmod 600 /swapfile  &&
sudo /sbin/mkswap /swapfile &&
sudo /sbin/swapon /swapfile
<!-- enable by default after reboot -->
sudo vi /etc/fstab
/swapfile swap swap defaults 0 0

<!-- create 1gb swapfile -->
<!-- enable by default after reboot -->
sudo dd if=/dev/zero of=/var/swapfile bs=1M count=1024 &&
sudo chmod 600 /var/swapfile &&
sudo mkswap /var/swapfile &&
echo /var/swapfile none swap defaults 0 0 | sudo tee -a /etc/fstab &&
sudo swapon -a
