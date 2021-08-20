-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 19 Agu 2021 pada 09.59
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
  `BusinessMatchID` bigint(20) DEFAULT '0',
  `BusinessOwnProduct` tinyint(4) DEFAULT '0',
  `BusinessAverageOmset` varchar(200) DEFAULT NULL,
  `BusinessLegalName` varchar(255) DEFAULT NULL,
  `BusinessBrandName` varchar(100) DEFAULT NULL,
  `BusinessMonthStand` int(11) DEFAULT NULL,
  `BusinessYearStand` int(11) DEFAULT NULL,
  `BusinessType` varchar(100) DEFAULT NULL,
  `BusinessCategory` varchar(100) DEFAULT NULL,
  `BusinessStatusBusiness` varchar(100) DEFAULT NULL,
  `BusinessSector` varchar(100) DEFAULT NULL,
  `BusinessDescription` text,
  `BusinessNIB` varchar(100) DEFAULT NULL,
  `BusinessTaxNumber` varchar(100) DEFAULT NULL,
  `BusinessDirectorName` varchar(100) DEFAULT NULL,
  `BusinessDirectorNIK` varchar(100) DEFAULT NULL,
  `BusinessDirectorTaxNumber` varchar(100) DEFAULT NULL,
  `BusinessKTPFile` varchar(255) DEFAULT NULL,
  `BusinessNPWPFile` varchar(255) DEFAULT NULL,
  `BusinessWebsite` varchar(255) DEFAULT NULL,
  `BusinessInstagram` varchar(255) DEFAULT NULL,
  `BusinessTiktok` varchar(100) NOT NULL,
  `BusinessWhatsapp` varchar(100) NOT NULL,
  `BusinessFacebook` varchar(100) DEFAULT NULL,
  `BusinessCreatedAt` datetime DEFAULT NULL,
  `BusinessCreatedBy` int(11) DEFAULT NULL,
  `BusinessModifiedAt` datetime DEFAULT NULL,
  `BusinessModifiedBy` int(11) NOT NULL,
  `BusinessStatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `business`
--

INSERT INTO `business` (`BusinessID`, `BusinessCode`, `BusinessMatchID`, `BusinessOwnProduct`, `BusinessAverageOmset`, `BusinessLegalName`, `BusinessBrandName`, `BusinessMonthStand`, `BusinessYearStand`, `BusinessType`, `BusinessCategory`, `BusinessStatusBusiness`, `BusinessSector`, `BusinessDescription`, `BusinessNIB`, `BusinessTaxNumber`, `BusinessDirectorName`, `BusinessDirectorNIK`, `BusinessDirectorTaxNumber`, `BusinessKTPFile`, `BusinessNPWPFile`, `BusinessWebsite`, `BusinessInstagram`, `BusinessTiktok`, `BusinessWhatsapp`, `BusinessFacebook`, `BusinessCreatedAt`, `BusinessCreatedBy`, `BusinessModifiedAt`, `BusinessModifiedBy`, `BusinessStatus`) VALUES
(9, 'B0001', 0, 0, NULL, '', 'asdfasdfa', 0, 2019, '', '', '', 'Agribisnis', NULL, '', '', NULL, '', '', NULL, NULL, '', 'asdfasdfa', '', '', NULL, '2021-08-19 10:05:43', 33, '2021-08-19 10:05:43', 0, 1),
(13, 'B00012', 0, 1, '< 5.000.000', '', 'fsadfasdfa', 0, 2021, '', '', '', 'Fashion', NULL, '', '', '', '', '', NULL, NULL, '', 'asdfadsf', '', '', NULL, '2021-08-19 10:24:59', 33, '2021-08-19 10:24:59', 0, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `business_matching`
--

CREATE TABLE `business_matching` (
  `BusinessMatchID` bigint(20) NOT NULL,
  `BusinessMatchTitle` varchar(255) NOT NULL,
  `BusinessMatchDescription` text NOT NULL,
  `BusinessMatchBanner` varchar(255) NOT NULL,
  `CategoryID` bigint(20) NOT NULL,
  `BusinessMatchDate` datetime NOT NULL,
  `BusinessMatchStart` datetime NOT NULL,
  `BusinessMatchEnd` datetime NOT NULL,
  `BusinessMatchCreatedAt` datetime NOT NULL,
  `BusinessMatchCreatedBy` int(11) NOT NULL,
  `BusinessMatchModifiedAt` datetime NOT NULL,
  `BusinessMatchModifiedBy` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `business_matching`
--

INSERT INTO `business_matching` (`BusinessMatchID`, `BusinessMatchTitle`, `BusinessMatchDescription`, `BusinessMatchBanner`, `CategoryID`, `BusinessMatchDate`, `BusinessMatchStart`, `BusinessMatchEnd`, `BusinessMatchCreatedAt`, `BusinessMatchCreatedBy`, `BusinessMatchModifiedAt`, `BusinessMatchModifiedBy`, `status`) VALUES
(3, 'Pekan Usaha Business', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', '/images/businessMatchBanner/1628786006567-BusinessMatchBanner.png', 2, '2021-09-20 00:00:00', '2021-09-20 00:00:00', '2021-09-30 00:00:00', '2021-08-12 23:33:26', 1, '2021-08-13 13:33:59', 1, 1);

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
  `CategoryID` bigint(20) NOT NULL,
  `ParentCategoryID` bigint(20) NOT NULL,
  `CategoryTitle` varchar(255) NOT NULL,
  `CategoryMetaTitle` varchar(100) NOT NULL,
  `CategorySlug` varchar(100) NOT NULL,
  `CategoryDescription` varchar(100) NOT NULL,
  `CategoryCreatedAt` datetime NOT NULL,
  `CategoryCreatedBy` bigint(20) NOT NULL,
  `CategoryModifiedAt` datetime NOT NULL,
  `CategoryModifiedBy` bigint(20) NOT NULL,
  `CategoryStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`CategoryID`, `ParentCategoryID`, `CategoryTitle`, `CategoryMetaTitle`, `CategorySlug`, `CategoryDescription`, `CategoryCreatedAt`, `CategoryCreatedBy`, `CategoryModifiedAt`, `CategoryModifiedBy`, `CategoryStatus`) VALUES
(1, 0, 'Webinar Series', 'Webinar Series', 'Webinar-series', 'Teknologi masa kini', '2021-08-03 01:51:56', 1, '2021-08-03 01:51:56', 0, 1),
(2, 0, 'Pekan Usaha', '', '', '', '2021-08-12 06:08:05', 1, '2021-08-12 06:08:05', 0, 1),
(3, 2, 'Demo Day', '', '', '', '2021-08-12 06:08:05', 1, '2021-08-12 06:08:05', 0, 1),
(4, 0, 'Business Matching', '', '', '', '2021-08-12 06:08:05', 1, '2021-08-12 06:08:05', 0, 1),
(5, 0, 'Pitching', '', '', '', '2021-08-12 06:08:05', 1, '2021-08-12 06:08:05', 0, 1),
(6, 0, 'Pekan Raya', '', '', '', '2021-08-12 06:08:05', 1, '2021-08-12 06:08:05', 0, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `EventID` int(11) NOT NULL,
  `OrganizerID` bigint(20) NOT NULL,
  `EventTitle` varchar(255) NOT NULL,
  `EventSubTitle` varchar(100) NOT NULL,
  `EventBanner` varchar(255) NOT NULL,
  `EventShortDescription` varchar(100) NOT NULL,
  `EventLongDescription` text NOT NULL,
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
  `EventStatus` int(11) NOT NULL,
  `LinkWebinar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`EventID`, `OrganizerID`, `EventTitle`, `EventSubTitle`, `EventBanner`, `EventShortDescription`, `EventLongDescription`, `EventCategoryID`, `EventAudiences`, `EventCompany`, `EventDate`, `EventCreatedAt`, `EventCreatedBy`, `EventPublishedAt`, `EventPublishedBy`, `EventModifiedAt`, `EventModifiedBy`, `EventStatus`, `LinkWebinar`) VALUES
(1, 3, 'Webinar Series #1 Pentingnya Pondasi Legalitas & Hak Cipta dalam UMKM', '', '/images/EventBanner/1628235333819-EventBanner.png', 'Webinar Series 1', 'Kabar Baik untuk Indonesia dari kami bagi seluruh rakyat Indonesia!\n\nMemanggil para pegiat dan pelaku UMKM di tanah air.\n\nUntuk membuat usaha kamu menjadi lebih #UsahaMajuKreatifMenguntungkan \nikutan rangkaian Webinar Series di Ruang UMKM Festival yuk!\n\nWebinar Series 1 - Pentingnya Pondasi Legalitas dan Hak Cipta dalam UMKM\n\nJumat, 6 Agustus 2021, 12.30 - 15.00 WIB\n\nTerbuka untuk umum yaaaa.\n\nUntuk kamu yang belum dan ingin mempunyai usaha atau yang sudah mempunyai usaha agar bisa membuat usaha kamu lebih maju.\n\nDaftar Sekarang di s.id/webinar1-RuangUMKM\nKuota terbatas! Hanya sisa 78 pendaftar lagi!\n\nFollow akun sosial media Ruang UMKM untuk lebih lengkapnya!\n\n#ruangumkm #ruangumkmfestival\n\nWebsite : www.ruangumkm.id\nInstagram : @ruangumkm.id\nFacebook : fb.me/ruangumkm.id\nChannel Telegram : t.me/ruangumkm\n\nKomunitas\nGroup Telegram : t.me/ruangumkm_tanya\n\nPowered by @ruangalternative | ruangalternative.com', 1, 'all age', '', '2021-08-30 10:00:00', '2021-08-03 03:03:49', 0, '2021-08-03 03:03:49', 0, '2021-08-12 23:22:14', 0, 0, ' s.id/webinar1-ruangumkm'),
(8, 3, 'Webinar Series #2 - Bagaimana UMKM Tetap Bertahan di masa Pandemi ?', '', '/images/EventBanner/1628711525252-EventBanner.jpg', 'Webinar Series 2', 'Kabar Baik untuk Indonesia dari kami bagi seluruh rakyat Indonesia!\n\nMemanggil para pegiat dan pelaku UMKM di tanah air.\n\nUntuk membuat usaha kamu menjadi lebih #UsahaMajuKreatifMenguntungkan \nikutan rangkaian Webinar Series di Ruang UMKM Festival yuk!\n\nWebinar Series 2 - Bagaimana UMKM Tetap Bertahan di masa Pandemi ?\n\nJumat, 13 Agustus 2021, 13.00 - 15.30 WIB\n\nTerbuka untuk umum yaaaa.\n\nGratis Biaya Pendaftaran\nGratis Sertifikat\n\nGiveaway Domain biz.id & voucher e-wallet\n\nUntuk kamu yang belum dan ingin mempunyai usaha atau yang sudah mempunyai usaha agar bisa membuat usaha kamu lebih maju.\n\nDaftar Sekarang di s.id/webinar2-ruangumkm\n\nFollow akun sosial media Ruang UMKM untuk lebih lengkapnya!\n\n#ruangumkm #ruangumkmfestival\n\nWebsite : www.ruangumkm.id\nInstagram : @ruangumkm.id\nFacebook : fb.me/ruangumkm.id\nChannel Telegram : t.me/ruangumkm\n\nKomunitas\nGroup Telegram : t.me/ruangumkm_tanya\n\nPowered by @ruangalternative | ruangalternative.com', 1, 'all age', '', '2021-08-24 11:00:00', '2021-08-06 15:09:38', 0, '2021-08-06 15:09:38', 0, '2021-08-12 02:52:05', 0, 0, 's.id/webinar2-ruangumkm'),
(11, 3, 'Webinar Series #3', '', '/images/EventBanner/1628567829407-EventBanner.png', 'Webinar Series 3', 'Webinar Series 3', 1, 'all age', '', '2021-08-25 19:00:00', '2021-08-10 10:57:09', 0, '2021-08-10 10:57:09', 0, '2021-08-10 10:57:09', 0, 0, ' s.id/webinar3-ruangumkm');

-- --------------------------------------------------------

--
-- Struktur dari tabel `events_orders`
--

CREATE TABLE `events_orders` (
  `OrdersID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `PekanRayaDescription` varchar(255) NOT NULL,
  `PekanRayaVideo` text,
  `PekanRayaPhoto1` text,
  `PekanRayaPhoto2` text,
  `PekanRayaPhoto3` text,
  `PekanRayaPhoto4` text,
  `PekanRayaKTPFile` text,
  `PekanRayaInformasiSingkat` text,
  `PekanRayaCreatedAt` timestamp NULL DEFAULT NULL,
  `PekanRayaCreatedBy` bigint(20) DEFAULT NULL,
  `PekanRayaModifiedAt` timestamp NULL DEFAULT NULL,
  `PekanRayaModifiedBy` bigint(20) DEFAULT NULL,
  `PekanRayaStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pekanraya`
--

INSERT INTO `pekanraya` (`PekanRayaID`, `BusinessID`, `PekanRayaDescription`, `PekanRayaVideo`, `PekanRayaPhoto1`, `PekanRayaPhoto2`, `PekanRayaPhoto3`, `PekanRayaPhoto4`, `PekanRayaKTPFile`, `PekanRayaInformasiSingkat`, `PekanRayaCreatedAt`, `PekanRayaCreatedBy`, `PekanRayaModifiedAt`, `PekanRayaModifiedBy`, `PekanRayaStatus`) VALUES
(3, 13, '', NULL, NULL, NULL, NULL, NULL, 'files/pekanRayaFile/file/1629343499622-PekanRayaKTPFile.png', 'files/pekanRayaFile/file/1629343499623-PekanRayaInformasiSingkat.png', '2021-08-19 03:24:59', 33, '2021-08-19 03:24:59', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pekanusaha`
--

CREATE TABLE `pekanusaha` (
  `PekanUsahaID` int(11) NOT NULL,
  `BusinessID` int(11) NOT NULL,
  `PekanUsahaMemberName1` varchar(255) NOT NULL,
  `PekanUsahaMemberGender1` int(11) NOT NULL,
  `PekanUsahaBirthPlace1` varchar(100) NOT NULL,
  `PekanUsahaMemberBirthDate1` datetime NOT NULL,
  `PekanUsahaMemberNIK1` varchar(100) NOT NULL,
  `PekanUsahaMemberEmail1` varchar(255) NOT NULL,
  `PekanUsahaMemberMobile1` varchar(100) NOT NULL,
  `PekanUsahaMemberName2` varchar(255) NOT NULL,
  `PekanUsahaMemberGender2` int(11) NOT NULL,
  `PekanUsahaBirthPlace2` varchar(100) NOT NULL,
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

INSERT INTO `pekanusaha` (`PekanUsahaID`, `BusinessID`, `PekanUsahaMemberName1`, `PekanUsahaMemberGender1`, `PekanUsahaBirthPlace1`, `PekanUsahaMemberBirthDate1`, `PekanUsahaMemberNIK1`, `PekanUsahaMemberEmail1`, `PekanUsahaMemberMobile1`, `PekanUsahaMemberName2`, `PekanUsahaMemberGender2`, `PekanUsahaBirthPlace2`, `PekanUsahaMemberBirthDate2`, `PekanUsahaMemberNIK2`, `PekanUsahaMemberEmail2`, `PekanUsahaMemberMobile2`, `PekanUsahaFile`, `PekanUsahaCreatedAt`, `PekanUsahaCreatedBy`, `PekanUsahaModifiedAt`, `PekanUsahaModifiedBy`, `PekanUsahaStatus`) VALUES
(4, 9, 'sdfasdfasdf', 1, 'sdfasdfa', '2021-08-10 00:00:00', '1231234123412', 'gdssdfgsd@gmail.com', '123123412341', '', 0, '', '0000-00-00 00:00:00', '', '', '', 'files/pekanUsahaFile/1629342343158-PekanUsahaFile.png', '2021-08-19 10:05:43', 33, '2021-08-19 10:05:43', 0, 1),
(5, 12, 'sdfasdfasdf', 1, 'sdfasdfa', '2021-08-04 00:00:00', '1231231231', 'gsdgsd@gmail.com', '123123121', '', 0, '', '0000-00-00 00:00:00', '', '', '', 'files/pekanUsahaFile/1629343458963-PekanUsahaFile.png', '2021-08-19 10:24:18', 33, '2021-08-19 10:24:18', 0, 1);

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
  `TicketID` bigint(20) NOT NULL,
  `EventID` bigint(20) NOT NULL,
  `TicketName` varchar(255) NOT NULL,
  `TicketDescription` text NOT NULL,
  `TicketIsFree` tinyint(1) NOT NULL,
  `TicketPrice` decimal(8,2) NOT NULL,
  `TicketQuantity` int(11) NOT NULL,
  `TicketStartDate` datetime NOT NULL,
  `TicketEndDate` datetime NOT NULL,
  `TicketCreatedAt` datetime NOT NULL,
  `TicketCreatedBy` bigint(20) NOT NULL,
  `TicketModifiedAt` datetime NOT NULL,
  `TicketModifiedBy` bigint(20) NOT NULL,
  `TicketStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tickets`
--

INSERT INTO `tickets` (`TicketID`, `EventID`, `TicketName`, `TicketDescription`, `TicketIsFree`, `TicketPrice`, `TicketQuantity`, `TicketStartDate`, `TicketEndDate`, `TicketCreatedAt`, `TicketCreatedBy`, `TicketModifiedAt`, `TicketModifiedBy`, `TicketStatus`) VALUES
(2, 1, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 1, '0.00', 100, '2021-08-15 12:00:00', '2021-08-15 14:00:00', '2021-08-03 02:39:33', 1, '2021-08-10 14:39:04', 0, 0),
(3, 8, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 1, '0.00', 100, '2021-08-13 13:00:00', '2021-08-13 15:00:00', '2021-08-03 17:06:10', 1, '2021-08-10 14:39:27', 0, 0),
(4, 11, 'Festival UMKM', 'Webinar UMKM seluruh indonesia', 1, '0.00', 100, '2021-08-20 13:00:00', '2021-08-20 15:00:00', '2021-08-10 14:34:34', 1, '2021-08-10 14:39:54', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `RoleID` int(11) NOT NULL DEFAULT '0',
  `UserFirstName` varchar(255) DEFAULT NULL,
  `UserLastName` varchar(100) DEFAULT NULL,
  `UserGender` int(11) DEFAULT NULL,
  `UserBirthDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `UserThumbnail` varchar(255) DEFAULT NULL,
  `UserAddress1` varchar(100) DEFAULT NULL,
  `UserAddress2` varchar(100) DEFAULT NULL,
  `UserCity` varchar(100) DEFAULT NULL,
  `UserState` varchar(100) DEFAULT NULL,
  `UserCountry` varchar(255) DEFAULT NULL,
  `UserPhone` varchar(13) DEFAULT NULL,
  `UserMobile` varchar(13) DEFAULT NULL,
  `UserPostalCode` int(11) DEFAULT NULL,
  `UserNIK` char(15) DEFAULT NULL,
  `UserNPWP` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `UserEmail` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) DEFAULT NULL,
  `UserEmailVerified` int(11) NOT NULL DEFAULT '0',
  `UserCreatedAt` datetime NOT NULL,
  `UserCreatedBy` bigint(20) DEFAULT '0',
  `UserModifiedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `UserModifiedBy` bigint(20) NOT NULL DEFAULT '0',
  `UserStatus` tinyint(4) NOT NULL DEFAULT '1',
  `StatusResetPassword` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`UserID`, `RoleID`, `UserFirstName`, `UserLastName`, `UserGender`, `UserBirthDate`, `UserThumbnail`, `UserAddress1`, `UserAddress2`, `UserCity`, `UserState`, `UserCountry`, `UserPhone`, `UserMobile`, `UserPostalCode`, `UserNIK`, `UserNPWP`, `UserName`, `UserEmail`, `UserPassword`, `UserEmailVerified`, `UserCreatedAt`, `UserCreatedBy`, `UserModifiedAt`, `UserModifiedBy`, `UserStatus`, `StatusResetPassword`) VALUES
(3, 0, '', '', 0, '0000-00-00 00:00:00', '', '', '', '', '', '', NULL, NULL, 0, '', '', 'fachri g', 'fachrighiffary@ruangalternative.com', '$2b$04$DDywhSNwz17j3TULxs8CeOqEXUOkjUhy7P/DNomDX1csTLFuhtkwm', 1, '2021-08-06 10:40:37', 0, '2021-08-06 10:40:37', 0, 1, 0),
(33, 0, 'Fachri Ghiffary', NULL, 1, '1997-06-08 00:00:00', NULL, 'Bekasi', NULL, NULL, NULL, NULL, '082226068782', NULL, NULL, '330506150697000', '123098876123098', 'Facrhi', 'ghiffaryfachri@gmail.com', '$2b$04$TMmYfqKpqbL9fd9ioZZPQOSxSv3vBb6kmfJG64tXPJXit9Sc.rVa2', 1, '2021-08-19 09:43:11', 0, '2021-08-19 10:24:59', 33, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`BusinessID`,`BusinessCode`);

--
-- Indexes for table `business_matching`
--
ALTER TABLE `business_matching`
  ADD PRIMARY KEY (`BusinessMatchID`);

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
  MODIFY `BusinessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `business_matching`
--
ALTER TABLE `business_matching`
  MODIFY `BusinessMatchID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `carts_items`
--
ALTER TABLE `carts_items`
  MODIFY `CartItemID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `events_orders`
--
ALTER TABLE `events_orders`
  MODIFY `OrdersID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `events_orders_items`
--
ALTER TABLE `events_orders_items`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `PekanRayaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `pekanusaha`
--
ALTER TABLE `pekanusaha`
  MODIFY `PekanUsahaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
  MODIFY `TicketID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
rusersuangumkmruangumkm