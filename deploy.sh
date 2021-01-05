ssh root@49.235.82.163 "rm -rf /var/www/html/wechat/*"
echo 'deleted /var/www/html/wechat'
scp -r ./gzfront/* root@49.235.82.163:/var/www/html/wechat
echo 'sync complete'
