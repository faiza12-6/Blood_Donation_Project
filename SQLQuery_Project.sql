create database Blood_DonationDB;
use Blood_DonationDB;
go

-- patient
create table Patients(
    PatientId int identity(1,1) primary key,
    FullName nvarchar(100),
    BloodType nvarchar(10),
    Phone nvarchar(20)
);

-- donor
create table Donors(
    DonorId int identity(1,1) primary key,
    FullName nvarchar(100),
    BloodType nvarchar(10),
    Phone nvarchar(20)
);

-- donation

DROP TABLE IF EXISTS Donations;


CREATE TABLE Donations(
    DonationId INT IDENTITY(1,1) PRIMARY KEY,
    DonorId INT NOT NULL,
    PatientId INT NOT NULL,
    DonationDate DATE NOT NULL,
    FOREIGN KEY (DonorId) REFERENCES Donors(DonorId),
    FOREIGN KEY (PatientId) REFERENCES Patients(PatientId)
);


-- Users Table
CREATE TABLE Users(
    UserName NVARCHAR(100) NOT NULL,
    Password NVARCHAR(100) NOT NULL
);


-- inserts

--patient
insert into Patients (FullName, BloodType, Phone)
values
('Fatima Ali', 'O+', '062111111'),
('Abdirahman Ahmed', 'A+', '062222222');

--donor
insert into Donors (FullName, BloodType, Phone)
values
('Ahmed Ali', 'O+', '061234567'),
('Amina Hassan', 'A+', '061111111');

-- donation
insert into Donations (DonorId, PatientId, DonationDate)
values
(1, 1, '2026-06-01'),
(2, 2, '2026-06-02');

--users
insert into Users (UserName, Password)
values
('Faiza Abdi', '1234');


-- selects

select * from Patients;
select * from Donors;
select * from Donations;
select * from Users;

DROP TABLE Users;