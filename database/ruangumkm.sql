-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 10 Agu 2021 pada 13.15
-- Versi Server: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ruangumkm`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `business`
--

CREATE TABLE `business` (
  `BusinessID` int(11) NOT NULL,
  `BusinessCode` varchar(100) NOT NULL,
  `BusinessLegalName` varchar(255) NOT NULL,
  `BusinessBrandName` varchar(100) NOT NULL,
  `BusinessMonthStand` int(11) NOT NULL,
  `BusinessYearStand` int(11) NOT NULL,
  `BusinessType` varchar(100) NOT NULL,
  `BusinessCategory` varchar(100) NOT NULL,
  `BusinessStatusBusiness` varchar(100) NOT NULL,
  `BusinessSector` varchar(100) NOT NULL,
  `BusinessDescription` text NOT NULL,
  `BusinessNIB` varchar(100) NOT NULL,
  `BusinessTaxNumber` varchar(100) NOT NULL,
  `BusinessDirectorName` varchar(100) NOT NULL,
  `BusinessDirectorNIK` varchar(100) NOT NULL,
  `BusinessDirectorTaxNumber` varchar(100) NOT NULL,
  `BusinessKTPFile` varchar(255) NOT NULL,
  `BusinessNPWPFile` varchar(255) NOT NULL,
  `BusinessWebsite` varchar(255) NOT NULL,
  `BusinessInstagram` varchar(255) NOT NULL,
  `BusinessCreatedAt` datetime NOT NULL,
  `BusinessCreatedBy` int(11) NOT NULL,
  `BusinessModifiedAt` datetime NOT NULL,
  `BusinessModifiedBy` int(11) NOT NULL,
  `BusinessStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `business`
--

INSERT INTO `business` (`BusinessID`, `BusinessCode`, `BusinessLegalName`, `BusinessBrandName`, `BusinessMonthStand`, `BusinessYearStand`, `BusinessType`, `BusinessCategory`, `BusinessStatusBusiness`, `BusinessSector`, `BusinessDescription`, `BusinessNIB`, `BusinessTaxNumber`, `BusinessDirectorName`, `BusinessDirectorNIK`, `BusinessDirectorTaxNumber`, `BusinessKTPFile`, `BusinessNPWPFile`, `BusinessWebsite`, `BusinessInstagram`, `BusinessCreatedAt`, `BusinessCreatedBy`, `BusinessModifiedAt`, `BusinessModifiedBy`, `BusinessStatus`) VALUES
(11, 'B0001', 'Ecommer Webinar', 'umkmRuang', 6, 2020, 'PT', 'micro', 'PKP', 'F&B', '', '14441231234', '44441233 4545', 'Fachri Ghiffary', '1230987312367098', '12323q41454544', '', '', 'www.ruangalternative.com', '@abu_hurairah_95', '2021-08-05 01:24:05', 1, '2021-08-05 01:28:25', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `CartID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts_items`
--

CREATE TABLE `carts_items` (
  `CartItemID` int(11) NOT NULL,
  `CartID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `ParentCategoryID` int(11) NOT NULL,
  `CategoryTitle` varchar(255) NOT NULL,
  `CategoryMetaTitle` varchar(100) NOT NULL,
  `CategorySlug` varchar(100) NOT NULL,
  `CategoryDescription` varchar(100) NOT NULL,
  `CategoryCreatedAt` datetime NOT NULL,
  `CategoryCreatedBy` bigint(20) NOT NULL,
  `CategoryModifiedAt` datetime NOT NULL,
  `CategoryModifiedBy` int(11) NOT NULL,
  `CategoryStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`CategoryID`, `ParentCategoryID`, `CategoryTitle`, `CategoryMetaTitle`, `CategorySlug`, `CategoryDescription`, `CategoryCreatedAt`, `CategoryCreatedBy`, `CategoryModifiedAt`, `CategoryModifiedBy`, `CategoryStatus`) VALUES
(2, 0, 'Technology', 'Technologies', 'features-technology', 'Teknologi masa kini', '2021-08-03 01:51:56', 0, '2021-08-03 01:51:56', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `EventID` int(11) NOT NULL,
  `OrganizerID` int(11) NOT NULL,
  `EventTitle` varchar(255) NOT NULL,
  `EventSubTitle` varchar(100) NOT NULL,
  `EventBanner` varchar(255) NOT NULL,
  `EventShortDescription` varchar(100) NOT NULL,
  `EventLongDescription` varchar(100) NOT NULL,
  `EventCategoryID` int(11) NOT NULL,
  `EventAudiences` varchar(100) NOT NULL,
  `EventCompany` varchar(100) NOT NULL,
  `EventDate` datetime NOT NULL,
  `EventCreatedAt` datetime NOT NULL,
  `EventCreatedBy` int(11) NOT NULL,
  `EventPublishedAt` datetime NOT NULL,
  `EventPublishedBy` int(11) NOT NULL,
  `EventModifiedAt` datetime NOT NULL,
  `EventModifiedBy` int(11) NOT NULL,
  `EventStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`EventID`, `OrganizerID`, `EventTitle`, `EventSubTitle`, `EventBanner`, `EventShortDescription`, `EventLongDescription`, `EventCategoryID`, `EventAudiences`, `EventCompany`, `EventDate`, `EventCreatedAt`, `EventCreatedBy`, `EventPublishedAt`, `EventPublishedBy`, `EventModifiedAt`, `EventModifiedBy`, `EventStatus`) VALUES
(1, 3, 'Pemuda bangkit', 'Pemuda bangkit', '/images/EventBanner/1628235333819-EventBanner.png', 'Pemuda bangkit', 'Pemuda bangkit', 2, 'all age', 'Tokopedia', '2021-08-30 10:00:00', '2021-08-03 03:03:49', 0, '2021-08-03 03:03:49', 0, '2021-08-06 14:35:33', 0, 0),
(8, 3, 'Pemuda bangkit', 'Pemuda bangkit', '/images/EventBanner/1628237378566-EventBanner.png', 'Pemuda bangkit', 'Pemuda bangkit', 2, 'all age', 'Bukalapak', '2021-08-24 11:00:00', '2021-08-06 15:09:38', 0, '2021-08-06 15:09:38', 0, '2021-08-06 15:09:38', 0, 0),
(11, 3, 'Pemuda bangkit', 'Pemuda bangkit', '/images/EventBanner/1628567829407-EventBanner.png', 'Pemuda bangkit', 'Pemuda bangkit', 2, 'all age', 'Shopee', '2021-08-25 19:00:00', '2021-08-10 10:57:09', 0, '2021-08-10 10:57:09', 0, '2021-08-10 10:57:09', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events_orders`
--

CREATE TABLE `events_orders` (
  `OrdersID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events_orders`
--

INSERT INTO `events_orders` (`OrdersID`, `UserID`) VALUES
(11, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events_orders_items`
--

CREATE TABLE `events_orders_items` (
  `OrderItemID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `OrderStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events_orders_items`
--

INSERT INTO `events_orders_items` (`OrderItemID`, `EventID`, `OrderID`, `OrderStatus`) VALUES
(11, 1, 11, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events_tags`
--

CREATE TABLE `events_tags` (
  `ID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `TagID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events_tags`
--

INSERT INTO `events_tags` (`ID`, `EventID`, `TagID`) VALUES
(1, 1, '1'),
(5, 8, '2'),
(13, 8, '3'),
(17, 11, '1'),
(18, 11, '2'),
(19, 11, '3');

-- --------------------------------------------------------

--
-- Struktur dari tabel `organizers`
--

CREATE TABLE `organizers` (
  `OrganizerID` int(11) NOT NULL,
  `OrganizerName` varchar(255) NOT NULL,
  `OrganizerDescription` varchar(255) NOT NULL,
  `OrganizerLogo` varchar(255) NOT NULL,
  `OrganizerCover` varchar(255) NOT NULL,
  `OrganizerCountry` varchar(255) NOT NULL,
  `OrganizerPhone` int(11) NOT NULL,
  `OrganizerEmail` varchar(255) NOT NULL,
  `OrganizerWebsite` varchar(255) NOT NULL,
  `OrganizerFacebook` varchar(255) NOT NULL,
  `OrganizerTwitter` varchar(255) NOT NULL,
  `OrganizerInstagram` varchar(255) NOT NULL,
  `OrganizerTitTok` varchar(255) NOT NULL,
  `OrganizerLinkedIn` varchar(255) NOT NULL,
  `OrganizerYouTube` varchar(255) NOT NULL,
  `OrganizerVideoURL` varchar(255) NOT NULL,
  `OrganizerCreatedAt` datetime NOT NULL,
  `OrganizerCreatedBy` int(11) NOT NULL,
  `OrganizerModifiedAt` datetime NOT NULL,
  `OrganizerModifiedBy` int(11) NOT NULL,
  `OrganizerStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `organizers`
--

INSERT INTO `organizers` (`OrganizerID`, `OrganizerName`, `OrganizerDescription`, `OrganizerLogo`, `OrganizerCover`, `OrganizerCountry`, `OrganizerPhone`, `OrganizerEmail`, `OrganizerWebsite`, `OrganizerFacebook`, `OrganizerTwitter`, `OrganizerInstagram`, `OrganizerTitTok`, `OrganizerLinkedIn`, `OrganizerYouTube`, `OrganizerVideoURL`, `OrganizerCreatedAt`, `OrganizerCreatedBy`, `OrganizerModifiedAt`, `OrganizerModifiedBy`, `OrganizerStatus`) VALUES
(3, 'runaglaternative', 'Memberikan ruang untuk UMKM seluruh indonesia', '/images/organizerlogo/1627933867325-OrganizerLogo.jpg', '/images/organizerCover/1627933867327-OrganizerCover.jpeg', 'Amerika', 0, '', '', '', '', '', '', '', '', '', '2021-08-03 01:52:25', 0, '2021-08-03 02:51:07', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `partners`
--

CREATE TABLE `partners` (
  `PartnerID` int(11) NOT NULL,
  `PartnerName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pekanraya`
--

CREATE TABLE `pekanraya` (
  `PekanRayaID` int(11) NOT NULL,
  `BusinessID` int(11) NOT NULL,
  `PekanRayaDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pekanusaha`
--

CREATE TABLE `pekanusaha` (
  `PekanUsahaID` int(11) NOT NULL,
  `BusinessID` int(11) NOT NULL,
  `PekanUsahaMemberName1` varchar(255) NOT NULL,
  `PekanUsahaMemberGender1` int(11) NOT NULL,
  `PekanUsahaMemberBirthDate1` datetime NOT NULL,
  `PekanUsahaMemberNIK1` varchar(100) NOT NULL,
  `PekanUsahaMemberEmail1` varchar(255) NOT NULL,
  `PekanUsahaMemberMobile1` varchar(100) NOT NULL,
  `PekanUsahaMemberName2` varchar(255) NOT NULL,
  `PekanUsahaMemberGender2` int(11) NOT NULL,
  `PekanUsahaMemberBirthDate2` datetime NOT NULL,
  `PekanUsahaMemberNIK2` varchar(100) NOT NULL,
  `PekanUsahaMemberEmail2` varchar(100) NOT NULL,
  `PekanUsahaMemberMobile2` varchar(100) NOT NULL,
  `PekanUsahaFile` varchar(255) NOT NULL,
  `PekanUsahaCreatedAt` datetime NOT NULL,
  `PekanUsahaCreatedBy` int(11) NOT NULL,
  `PekanUsahaModifiedAt` datetime NOT NULL,
  `PekanUsahaModifiedBy` int(11) NOT NULL,
  `PekanUsahaStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pekanusaha`
--

INSERT INTO `pekanusaha` (`PekanUsahaID`, `BusinessID`, `PekanUsahaMemberName1`, `PekanUsahaMemberGender1`, `PekanUsahaMemberBirthDate1`, `PekanUsahaMemberNIK1`, `PekanUsahaMemberEmail1`, `PekanUsahaMemberMobile1`, `PekanUsahaMemberName2`, `PekanUsahaMemberGender2`, `PekanUsahaMemberBirthDate2`, `PekanUsahaMemberNIK2`, `PekanUsahaMemberEmail2`, `PekanUsahaMemberMobile2`, `PekanUsahaFile`, `PekanUsahaCreatedAt`, `PekanUsahaCreatedBy`, `PekanUsahaModifiedAt`, `PekanUsahaModifiedBy`, `PekanUsahaStatus`) VALUES
(3, 11, 'Ghiffary Fachri', 1, '1997-06-15 00:00:00', '123413241324', 'fachrighiffary@gmail.com', '123413241324', 'Fachri ghiffary', 1, '1997-06-15 00:00:00', '123413241324', 'fachrighiffary@gmail.com', '123413241324', '', '2021-08-05 10:07:35', 1, '2021-08-05 10:23:10', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `BusinessID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_tags`
--

CREATE TABLE `products_tags` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `TagID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(255) NOT NULL,
  `RoleDescription` varchar(255) NOT NULL,
  `RoleCreatedAt` datetime NOT NULL,
  `RoleCreatedBy` bigint(20) NOT NULL,
  `RoleModifiedAt` datetime NOT NULL,
  `RoleModifiedBy` int(11) NOT NULL,
  `RoleStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`, `RoleDescription`, `RoleCreatedAt`, `RoleCreatedBy`, `RoleModifiedAt`, `RoleModifiedBy`, `RoleStatus`) VALUES
(1, 'Admin', 'administrator', '2021-07-30 06:13:19', 1, '2021-07-30 16:39:24', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `speakers`
--

CREATE TABLE `speakers` (
  `SpeakerID` int(11) NOT NULL,
  `SpeakerName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tags`
--

CREATE TABLE `tags` (
  `TagID` int(11) NOT NULL,
  `TagTitle` varchar(255) NOT NULL,
  `TagMetaTitle` varchar(100) NOT NULL,
  `TagSlug` varchar(100) NOT NULL,
  `TagDescription` varchar(100) NOT NULL,
  `TagCreatedAt` datetime NOT NULL,
  `TagCreatedBy` int(11) NOT NULL,
  `TagModifiedAt` datetime NOT NULL,
  `TagModifiedBy` int(11) NOT NULL,
  `TagStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tags`
--

INSERT INTO `tags` (`TagID`, `TagTitle`, `TagMetaTitle`, `TagSlug`, `TagDescription`, `TagCreatedAt`, `TagCreatedBy`, `TagModifiedAt`, `TagModifiedBy`, `TagStatus`) VALUES
(1, 'LifeStyle', 'LifeStyle', 'LifeStyle', 'LifeStyle', '2021-08-03 01:41:54', 0, '2021-08-03 03:06:57', 0, 0),
(2, 'Education', 'Education', 'Education', 'Education', '2021-08-03 19:46:03', 0, '2021-08-03 19:46:03', 0, 0),
(3, 'Motifation', 'Motifation', 'Motifation', 'Motifation', '2021-08-03 19:46:14', 0, '2021-08-03 19:46:14', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tickets`
--

CREATE TABLE `tickets` (
  `TicketID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `TicketName` varchar(255) NOT NULL,
  `TicketDescription` varchar(255) NOT NULL,
  `TicketIsFree` varchar(1) NOT NULL,
  `TicketPrice` int(11) NOT NULL,
  `TicketQuantity` int(11) NOT NULL,
  `TicketStartDate` datetime NOT NULL,
  `TicketEndDate` datetime NOT NULL,
  `TicketCreatedAt` datetime NOT NULL,
  `TicketCreatedBy` int(11) NOT NULL,
  `TicketModifiedAt` datetime NOT NULL,
  `TicketModifiedBy` int(11) NOT NULL,
  `TicketStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tickets`
--

INSERT INTO `tickets` (`TicketID`, `EventID`, `TicketName`, `TicketDescription`, `TicketIsFree`, `TicketPrice`, `TicketQuantity`, `TicketStartDate`, `TicketEndDate`, `TicketCreatedAt`, `TicketCreatedBy`, `TicketModifiedAt`, `TicketModifiedBy`, `TicketStatus`) VALUES
(2, 1, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 'y', 200000, 20, '2021-08-15 00:00:00', '2021-08-31 00:00:00', '2021-08-03 02:39:33', 0, '2021-08-10 14:39:04', 0, 0),
(3, 8, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 'y', 200000, 20, '2021-08-15 00:00:00', '2021-08-31 00:00:00', '2021-08-03 17:06:10', 0, '2021-08-10 14:39:27', 0, 0),
(4, 11, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 'y', 200000, 20, '2021-08-15 00:00:00', '2021-08-31 00:00:00', '2021-08-10 14:34:34', 0, '2021-08-10 14:39:54', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `RoleID` int(11) NOT NULL,
  `UserFirstName` varchar(255) NOT NULL,
  `UserLastName` varchar(100) NOT NULL,
  `UserGender` int(11) NOT NULL,
  `UserBirthDate` datetime NOT NULL,
  `UserThumbnail` varchar(255) NOT NULL,
  `UserAddress1` varchar(100) NOT NULL,
  `UserAddress2` varchar(100) NOT NULL,
  `UserCity` varchar(100) NOT NULL,
  `UserState` varchar(100) NOT NULL,
  `UserCountry` varchar(255) NOT NULL,
  `UserPhone` int(11) NOT NULL,
  `UserMobile` int(11) NOT NULL,
  `UserPostalCode` int(11) NOT NULL,
  `UserNIK` char(15) NOT NULL,
  `UserNPWP` varchar(255) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `UserPassword` varchar(255) NOT NULL,
  `UserEmailVerified` int(11) NOT NULL,
  `UserCreatedAt` datetime NOT NULL,
  `UserCreatedBy` bigint(20) NOT NULL,
  `UserModifiedAt` datetime NOT NULL,
  `UserModifiedBy` bigint(20) NOT NULL,
  `UserStatus` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`UserID`, `RoleID`, `UserFirstName`, `UserLastName`, `UserGender`, `UserBirthDate`, `UserThumbnail`, `UserAddress1`, `UserAddress2`, `UserCity`, `UserState`, `UserCountry`, `UserPhone`, `UserMobile`, `UserPostalCode`, `UserNIK`, `UserNPWP`, `UserName`, `UserEmail`, `UserPassword`, `UserEmailVerified`, `UserCreatedAt`, `UserCreatedBy`, `UserModifiedAt`, `UserModifiedBy`, `UserStatus`) VALUES
(1, 1, 'Fachri', 'Ghiffary', 1, '0000-00-00 00:00:00', '', '', '', '', '', '', 0, 0, 0, '', '', 'fachrighiffary', 'fachrighiffary@ruangalternative.com', '$2b$09$eZ0ztn1Iem7suoyrph4MXuFltLWsupK/MaX7V24qTc/94kGSDd8O2', 0, '2021-08-04 23:22:28', 0, '2021-08-04 23:28:06', 1, 0),
(2, 0, '', '', 0, '0000-00-00 00:00:00', '', '', '', '', '', '', 0, 0, 0, '', '', '', '', '$2b$06$iY2h.s3JAyuDEQ86Zir4/uxgE61Zw.30ZuZ7bCa07lylxWiYo4PE6', 0, '2021-08-06 10:35:14', 0, '2021-08-06 10:35:14', 0, 0),
(3, 0, '', '', 0, '0000-00-00 00:00:00', '', '', '', '', '', '', 0, 0, 0, '', '', 'fachri g', 'fachrighiffary@gmail.com', '$2b$04$DDywhSNwz17j3TULxs8CeOqEXUOkjUhy7P/DNomDX1csTLFuhtkwm', 0, '2021-08-06 10:40:37', 0, '2021-08-06 10:40:37', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`BusinessID`,`BusinessCode`),
  ADD UNIQUE KEY `BusinessNIB` (`BusinessNIB`),
  ADD UNIQUE KEY `BusinessTaxNumber` (`BusinessTaxNumber`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`CartID`);

--
-- Indexes for table `carts_items`
--
ALTER TABLE `carts_items`
  ADD PRIMARY KEY (`CartItemID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`EventID`);

--
-- Indexes for table `events_orders`
--
ALTER TABLE `events_orders`
  ADD PRIMARY KEY (`OrdersID`);

--
-- Indexes for table `events_orders_items`
--
ALTER TABLE `events_orders_items`
  ADD PRIMARY KEY (`OrderItemID`);

--
-- Indexes for table `events_tags`
--
ALTER TABLE `events_tags`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`OrganizerID`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`PartnerID`);

--
-- Indexes for table `pekanraya`
--
ALTER TABLE `pekanraya`
  ADD PRIMARY KEY (`PekanRayaID`);

--
-- Indexes for table `pekanusaha`
--
ALTER TABLE `pekanusaha`
  ADD PRIMARY KEY (`PekanUsahaID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `products_tags`
--
ALTER TABLE `products_tags`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`SpeakerID`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`TagID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`TicketID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `BusinessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `carts_items`
--
ALTER TABLE `carts_items`
  MODIFY `CartItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `events_orders`
--
ALTER TABLE `events_orders`
  MODIFY `OrdersID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `events_orders_items`
--
ALTER TABLE `events_orders_items`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `events_tags`
--
ALTER TABLE `events_tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `OrganizerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `PartnerID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pekanraya`
--
ALTER TABLE `pekanraya`
  MODIFY `PekanRayaID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pekanusaha`
--
ALTER TABLE `pekanusaha`
  MODIFY `PekanUsahaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products_tags`
--
ALTER TABLE `products_tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `SpeakerID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `TagID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `TicketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
