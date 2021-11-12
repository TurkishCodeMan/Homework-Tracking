# EV ÖDEV TAKİBİ (Homework Tracking)

 ## Proje Information 
#### Proje React Ve Javascript Kullanılarak Yapılmıştır Client State için Context API Kullanılmış Olup Server State için React Query Kullanılmıştır.Style için Emotion ve CSS in JS yazılmıştır.

#### Mimari Kurallara Ve SOLID ilkelerine dikkat edilerek componentler tasarlanmaya çalışılmıştır.
#### Dosya Yapısı 

 📜  src :
	
		assets/ --> Assets ve CSS değişkenleri
		
		components/ Uygulama için uygulamaya özel componentler
		
		context/Client State için Uygulama bölümlerine özel context dosyaları
		
		data/Veritabanının simule edildiği yer
		
		screens/Uygulama genelindeki sayfalar
		
		server-state/Sunucu ile veri alışverisi için custom react query hookları buradadır
		
		shared/Genel her uygulamada kullanılacabilecek Hooklar ve Componentler
		
		styles/Renk vs
		
		utils/Backend sunucusunun simule edildiği yerdir test ve dev için ayrı ayarlanmıştır.
	



## 📝 Starting App

### 💯 npm install
### 💯npm start


#### Logout için profile Foto tıklayın ve açılan dropdowndan logout olunuz


#### Öğretmen Sınıfları Ve Ev Ödevleri Gibi Veriler LocalStorageda depolanmıştır.Kontrolleri /data içindedir.


#### Proje render index.js den başlıyor App.js de Auth ve Unauth süreçlerini ayırıyor authentication mantığı ./utils/auth-provider içinde tanımlanıp ./context AuthContext te kullanılmıştır.


## Backend
  

### MSW ile Backend ./utils klasörü içinde ön uçta simüle edilmiştir.

  #### Login için Gerekli olan Bilgiler (Diğer öğrenciler için src/data/students.json)
  

👨‍💼  Admin Login (Students veya Teachers Seçmeyin(Not Check)) :

		Email:admin
		Password:admin
        
     




 📜  Students Login (Check Students):
	
		Ahmet Kaymaz
		Email:ahmet@kaymaz.com
		Password:4455

		Fuat Aslan
		Email:fuat@aslan.com
		Password:4455

		Efecan Koç
		Email:efecan@koc.com
		Password:4455

	
	  
 📜  Teachers Login (Check Teachers):
	
		Mehmet Tatlıses
		Email:mehmet@tatlises.com
		Password:4455

		Hasan Can
		Email:hasan@can.com
		Password:4455




  
