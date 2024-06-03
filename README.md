# Azura's Local Booking System
## _A web application to easly manage meeting rooms reservations_

<div align="center">




![azura](https://github.com/PsychoGodly/Local_Booking/assets/90983397/c00ab123-5072-4e81-807d-84939935443a)



<div align="center">
    <a href="https://github.com/PsychoGodly/Local_Booking/tree/master/README.md#features">
        <img src="https://img.shields.io/badge/Features-cyan" alt="Features">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#beta-version-changelogs">
        <img src="https://img.shields.io/badge/Beta%20Version%20Changelogs-orange" alt="Beta Version Changelogs">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#stable-version-changelogs">
        <img src="https://img.shields.io/badge/Stable%20Version%20Changelogs-lightgreen" alt="Stable Version Changelogs">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#tech">
        <img src="https://img.shields.io/badge/Tech-yellow" alt="Tech">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/releases">
        <img src="https://img.shields.io/badge/Download-green" alt="Download">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#installation">
        <img src="https://img.shields.io/badge/Installation-orange" alt="Installation">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#run">
        <img src="https://img.shields.io/badge/Run-red" alt="Run">
    </a>
    <a href="https://github.com/PsychoGodly/Local_Booking/edit/main/README.md#license">
        <img src="https://img.shields.io/badge/License-lightgrey" alt="License">
    </a>
</div>




<div align="left">


## Features

- Authentification Page (Coming Soon)
- Reservations Management
    - Show reservations for each room type
    - Add a reservation
    - Edit a reservation
    - Delelte a reservation
    - Can't book a room in Holidays (NEW)
- User Session (Coming Soon)
    - Profile Settings (Coming Soon)
    - Reservations Management
- Admin Session (Coming Soon)
    - Profile Settings (Coming Soon)
    - Reservations Management 
    - User Management (Coming Soon)
        - Show Users (Coming Soon)
        - Add New User (Coming Soon)
        - Modify User (Coming Soon)
        - Delete User (Coming Soon)
    - Room Types Management (Coming Soon)
        - Show Room Types (Coming Soon)
        - Add New Room Type (Coming Soon)
        - Modify Room Type (Coming Soon)
        - Delete Room Type (Coming Soon)
    - Log Out (Coming Soon)


## Chalngelogs:
### Beta version Changelogs:

#### v6.9 | Current Beta
- Enhacned UI
- Added a sidebar
- Added a header
- Calendar UI chagned
- Single day error fixed
- Changed favicon and web app name
- Change port of backend in front from Config.js instead of changing it across the whole code
- Added Dashboard page with counts
- Updated code for support

#### v5.5
- Enhacned Login Page UI
- Enhanced Sidebar UI

#### v5.3
- Date Type Bug fixed
- Holidays Bugs fixed

#### v5.1
- Added Holidays
- Now you can't make a booking in Holidays
    

### Stable Version Changelogs:

#### v4.0 | Current
- New UI
- Added Notfication Messages when booking or deleting a reservaton
- Room Selction Bug fixed
- Date Selection Bug fixed
- Delete Reservation Bug fixed

#### v3.5
- Room Selection Bug fixes
- Cancel Button Bug fix

#### v3.2
- Rooms Selection

#### v2.9
- Delete Reservations
- Cleaner Code


#### v2.7
- Fixed Reservations Bugs

#### v2.5
- Delete Reservations

#### v2.0
- Add Reservations
- Modify Reservations

#### v1.8
- Database Intergration (MySQL)

#### v1.0 beta 
- Added Calendar
- 

## Tech

### Backend
- Spring Boot
    - Security
    - Data

### Frontend

- ReactJS
- Vite
- HTML
- Tailwind CSS
- FontAwesome
- FlowBite
- MySQL





## Installation

### Prerequisites
Ensure you have the following software installed:
- Node.js vX.X.X
- Java JDK 17+
- Maven
- PostgreSQL or MySQL database
  #### Local Deployemnt
- XAMPP | Local Database
- Visual Studio Code | Frontend
- Intellij IDEA | Backend

### Install the dependencies 
```
cd frontend
```
```
npm i vite
```
```
npm install react react-dom
```
```
npm install @fortawesome/fontawesome-free
```
```
npm install flowbite flowbite-react
```
```
npm install tailwindcss postcss autoprefixer
```
```
npx tailwindcss init
```
```
npm install antd --save
```

### Maven Configuration (pom.xml):
Add the following dependencies to your pom.xml file in the backend directory.


```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-quartz</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <version>3.2.5</version>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>2.2.224</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.3.0</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.32</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <version>3.2.5</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.6.2</version>
    </dependency>
</dependencies>

```




## Run

### Frontend

```
cd frontend
```
```
npm run dev
```
### Backend

```
cd backend
```
```
mvn spring-boot:run
```
or just run BackendApplication if you are using Intellij IDEA

## License


---

**Attribution-NonCommercial License (CC BY-NC)**

Copyright (c) 2024 Psycho Godly, MedDevp, Expert Quest Co, Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, subject to the following conditions:

1. **Use Limitation:** The Software may be used solely for non-commercial purposes. Any commercial use of the Software is strictly prohibited without prior written permission from Psycho Godly, MedDevp, Expert Quest Co, Ltd.

2. **Attribution:** You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

3. **No Warranty:** The Software is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall Psycho Godly, MedDevp, Expert Quest Co, Ltd. or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the Software.

4. **Changes:** If you modify the Software, you must retain all copyright notices and license terms in the modified version.

5. **Notice:** For any reuse or distribution, you must make clear to others the license terms of this work. The best way to do this is with a link to this web page: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

This license is based on the Creative Commons Attribution-NonCommercial 4.0 International License. To view a copy of this license, visit [https://creativecommons.org/licenses/by-nc/4.0/legalcode](https://creativecommons.org/licenses/by-nc/4.0/legalcode)

---

This license text specifies that the software is free for non-commercial use only, and commercial use requires written permission from Psycho Godly, MedDevp, Expert Quest Co, Ltd.
