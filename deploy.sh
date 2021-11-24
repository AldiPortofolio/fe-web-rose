ng build
cd dist/
mv secpage rose
zip -r rose.zip rose

# sudo scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1-new.pem rose.zip ubuntu@13.228.25.85:/home/ubuntu/rose
# sudo scp -i /Users/abdulah/OttopayAwsLite.pem rose.zip ubuntu@13.228.25.85:/home/ubuntu/rose 
# scp rose.zip ketut@10.10.43.10:/home/ketut/abdul
# sudo scp -i /Users/abdulah/Documents/devsfa.priv rose.zip devsfa@34.101.126.12:/home/devsfa/abdullah/rose
