//pasos
npx cap init //primera vez si no hay config capacitor
delete the android folder
delete the www folder
run: ionic capacitor add android
run: ionic build (this will create the www folder with all needed html and js files in it)
run: npx cap sync
run: npx cap open android
run the project on your phone.