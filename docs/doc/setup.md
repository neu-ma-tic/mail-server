# setup
<article class="message is-warning">
  <div class="message-body">
    this guide **assumes** that you have a linux server. if you are on windows, steps should be similar, but support is not 100% gauranteed..
    if you want to make a guide for windows, make a PR.
    <a href="https://my.frantech.ca/aff.php?aff=5405">cheap linux servers (affiliate URL)</a>
  </div>
</article>

## step one  
install node and npm:  
```bash
wget https://cdn.jsdelivr.net/npm/n/bin/n
sudo n lts
```

## step two  
clone the repo and install required modules  
```bash
git clone https://git.sr.ht/~neu/mail-server
cd mail-server
npm i
```

## step three  
running  
to run once
```bash
node .
```
to run 24/7  
```bash
sudo npm i -g pm2
pm2 start ecosystem.config.js
```
[pm2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

## step four  
to listen on port 25 on linux requires root priveleges, and that isn't the best thing to give to a public-facing app  
to combat this, I use iptables to forward traffic from port 25 to 2525  
also, most hosts block port 25 incoming traffic to block email spam, so you may need to ask them to open it for you  
### add iptables forwarding rule  
```bash
iptables -t nat -A OUTPUT -o lo -p tcp --dport 25 -j REDIRECT --to-port 2525
```


## step five (optional)  
if you enabled authentication, generate a key with
```bash
npm run key
```
and add it to your config file