To run the project:  

Clone repository,  

Run VsCode or other terminal,  

cd my-laravel-app  
  
composer install  
npm install  
cp .env.example .env  
  
now for .env file update these settings:  
  
DB_CONNECTION=pgsql  
DB_HOST=127.0.0.1  
DB_PORT=5432  
DB_DATABASE=my_airport_app  
DB_USERNAME=postgres  
DB_PASSWORD=password  
  
MAIL_MAILER=smtp    
MAIL_HOST=smtp.gmail.com    
MAIL_PORT=587     
MAIL_USERNAME={your gmail}   
MAIL_PASSWORD={app password}  
MAIL_ENCRYPTION=tls    
MAIL_FROM_ADDRESS={your gmail}    
MAIL_FROM_NAME="${APP_NAME}"     
    

(This app uses Postgres, so if possible add password to your postgres database, in PgAdmin4 do this: in Login/Group Roles select postgres properties,   
in Definition tab set password, use that password in DB_Password, Also In PhP directory (php.ini) remove ";" for extension=pdo_pgsql and extension=pgsql)  
   
run these commands:  
php artisan key:generate    
php artisan serve    
  
  
To Run Nextjs:    
Create new terminal and run these commands:  
  
cd my-nextjs-app    
npm install    

Create a .env.local file in the frontend folder and add:  
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

after that run:  
npm run dev  







