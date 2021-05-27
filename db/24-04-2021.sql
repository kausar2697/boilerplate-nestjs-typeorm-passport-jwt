-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2021 at 11:18 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quykshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pay_transaction`
--

CREATE TABLE `pay_transaction` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `id` int(11) NOT NULL,
  `shopId` varchar(50) DEFAULT NULL,
  `shopTitle` varchar(150) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cellNo` varchar(50) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `otpCode` int(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `shopType` varchar(100) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `bisOwner` varchar(100) DEFAULT NULL,
  `bisLegalForm` varchar(100) DEFAULT NULL,
  `bisAddress` varchar(255) DEFAULT NULL,
  `bisCountry` varchar(100) DEFAULT NULL,
  `bisPersonInchrg` varchar(100) DEFAULT NULL,
  `bisRegNum` varchar(100) DEFAULT NULL,
  `bisNidNo` varchar(100) DEFAULT NULL,
  `bisDivision` int(50) DEFAULT NULL,
  `bisCity` int(50) DEFAULT NULL,
  `bisZone` int(50) DEFAULT NULL,
  `bisIdType` varchar(100) DEFAULT NULL,
  `accTitle` varchar(100) DEFAULT NULL,
  `accNo` varchar(100) DEFAULT NULL,
  `accBankName` varchar(100) DEFAULT NULL,
  `accBranchName` varchar(100) DEFAULT NULL,
  `accRoutingNo` varchar(100) DEFAULT NULL,
  `nidFrontImg` text DEFAULT NULL,
  `nidBackImg` text DEFAULT NULL,
  `accCheckImg` text DEFAULT NULL,
  `nidVerificationStatus` varchar(100) DEFAULT NULL,
  `emailVarificationStatus` tinyint(4) NOT NULL DEFAULT 0,
  `cellVarificationStatus` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `updatedBy` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`id`, `shopId`, `shopTitle`, `slug`, `cellNo`, `mail`, `otpCode`, `address`, `shopType`, `avatar`, `status`, `bisOwner`, `bisLegalForm`, `bisAddress`, `bisCountry`, `bisPersonInchrg`, `bisRegNum`, `bisNidNo`, `bisDivision`, `bisCity`, `bisZone`, `bisIdType`, `accTitle`, `accNo`, `accBankName`, `accBranchName`, `accRoutingNo`, `nidFrontImg`, `nidBackImg`, `accCheckImg`, `nidVerificationStatus`, `emailVarificationStatus`, `cellVarificationStatus`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) VALUES
(1, 'EB100001', 'test1', 'test1', NULL, 'test@gmail.com', NULL, NULL, NULL, NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-12 16:11:08', 1, '2021-04-12 16:11:08', NULL),
(2, 'EB100002', 'test2', 'test2', NULL, 'test1@gmail.com', NULL, NULL, NULL, NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-12 16:19:52', 3, '2021-04-12 16:19:52', NULL),
(3, 'EB100003', 'test3', 'test3', NULL, 'test3@gmail.com', NULL, NULL, NULL, NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-13 14:55:40', 4, '2021-04-13 14:55:40', NULL),
(4, 'EB100004', 'Kausar Shop', 'kausar-shop', NULL, 'kausar@everexpert.com', NULL, NULL, NULL, NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-15 12:52:54', 5, '2021-04-15 12:52:54', NULL),
(5, 'EB100005', 'test22', 'test22', NULL, 'test22@gmail.com', NULL, NULL, 'starter', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-20 15:37:17', 7, '2021-04-20 15:37:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `values` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `updatedBy` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `term`
--

CREATE TABLE `term` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` enum('text','single-choice','multiple-choice') NOT NULL,
  `description` text DEFAULT NULL,
  `isDynamic` tinyint(4) NOT NULL DEFAULT 1,
  `frontendVisibility` tinyint(4) DEFAULT 0,
  `required` tinyint(4) DEFAULT 0,
  `toolTipText` varchar(255) DEFAULT NULL,
  `updatedBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `term`
--

INSERT INTO `term` (`id`, `title`, `type`, `description`, `isDynamic`, `frontendVisibility`, `required`, `toolTipText`, `updatedBy`, `updatedAt`, `createdBy`, `createdAt`) VALUES
(1, 'Category', 'single-choice', NULL, 0, 0, 0, NULL, NULL, '2021-04-24 12:46:48', NULL, '2021-04-24 12:46:48'),
(2, 'Brand', 'single-choice', NULL, 0, 0, 0, NULL, NULL, '2021-04-24 14:42:57', NULL, '2021-04-24 14:42:57');

-- --------------------------------------------------------

--
-- Table structure for table `term_value`
--

CREATE TABLE `term_value` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `order` int(50) DEFAULT NULL,
  `status` enum('published','unuplished') NOT NULL,
  `images` text DEFAULT NULL,
  `featured` tinyint(4) DEFAULT 0,
  `metadata` text DEFAULT NULL,
  `updatedBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `parentTermValues` text DEFAULT NULL,
  `parentTermValueId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `term_value`
--

INSERT INTO `term_value` (`id`, `title`, `slug`, `description`, `order`, `status`, `images`, `featured`, `metadata`, `updatedBy`, `updatedAt`, `createdBy`, `createdAt`, `parentTermValues`, `parentTermValueId`, `sellerId`) VALUES
(1, 'Mobile', 'mobile-1619247036434', 'test', 99999, 'published', '{\"icon\":{\"url\":\"test.jpg\",\"alt\":\"test\"},\"image\":{\"url\":\"test.jpg\",\"alt\":\"test\"},\"banner\":{\"url\":\"test.jpg\",\"alt\":\"test\"}}', 0, NULL, NULL, '2021-04-24 12:50:36', 5, '2021-04-24 12:50:36', NULL, NULL, 4),
(3, 'Smart Phone', 'smart-phone-1619247443842', 'test', 99999, 'published', '{\"icon\":{\"url\":\"test.jpg\",\"alt\":\"test\"},\"image\":{\"url\":\"test.jpg\",\"alt\":\"test\"},\"banner\":{\"url\":\"test.jpg\",\"alt\":\"test\"}}', 0, NULL, NULL, '2021-04-24 12:57:23', 5, '2021-04-24 12:57:23', '[1]', 1, 4),
(4, 'Walton', 'walton-1619253841476', 'test', 99999, 'published', '{\"icon\":{\"url\":\"image.jpg\",\"alt\":\"image\"},\"image\":{\"url\":\"image.jpg\",\"alt\":\"image\"},\"banner\":{\"url\":\"imge.jpg\",\"alt\":\"imge\"}}', 0, NULL, NULL, '2021-04-24 14:44:01', 5, '2021-04-24 14:44:01', NULL, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `term_vs_termvalue`
--

CREATE TABLE `term_vs_termvalue` (
  `termId` int(11) NOT NULL,
  `termValueId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `term_vs_termvalue`
--

INSERT INTO `term_vs_termvalue` (`termId`, `termValueId`) VALUES
(1, 1),
(1, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `cellNo` varchar(50) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `fullName` varchar(60) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `addresses` text DEFAULT NULL,
  `DOB` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `otpCode` int(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `updatedBy` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `cellNo`, `mail`, `avatar`, `fullName`, `username`, `password`, `addresses`, `DOB`, `gender`, `nationality`, `otpCode`, `status`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) VALUES
(5, NULL, 'kausar@everexpert.com', NULL, NULL, NULL, '$2b$08$ar8cN9PuT2n0f2u5JLhkUuIgiDDiTau0ggTDdlsTrFfwG.h0KWFtS', NULL, NULL, NULL, NULL, 0, NULL, '2021-04-15 10:37:55', NULL, '2021-04-15 10:37:55', NULL),
(6, NULL, 'admin@quykshop.com', NULL, NULL, NULL, '$2b$08$15BZaMUb5Ag8lgdKkgUhhOUYK.ASFOQ7tt7DEpkSsWibola7KX/7K', NULL, NULL, NULL, NULL, 0, NULL, '2021-04-18 14:31:57', NULL, '2021-04-18 14:31:57', NULL),
(7, NULL, 'test22@gmail.com', NULL, NULL, NULL, '$2b$08$Yz4.Ci8xurqPOd5UOBS0nO90zxbkEcTXcR54W7UQsh0WXrYy1zuNa', NULL, NULL, NULL, NULL, 0, NULL, '2021-04-20 15:30:29', NULL, '2021-04-20 15:30:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `updatedBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`id`, `title`, `status`, `updatedBy`, `updatedAt`, `createdBy`, `createdAt`) VALUES
(3, 'user | login to shopPanel', 'active', NULL, '2021-04-15 12:42:58', NULL, '2021-04-15 12:42:58'),
(4, 'user | login to adminPanel', 'active', NULL, '2021-04-18 14:26:48', NULL, '2021-04-18 14:26:48');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `updatedBy` int(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp(),
  `createdBy` int(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `title`, `status`, `updatedBy`, `updatedAt`, `createdBy`, `createdAt`) VALUES
(9, 'shop-admin', 'active', NULL, '2021-04-15 10:39:23', NULL, '2021-04-15 10:39:23'),
(10, 'master-admin', 'active', NULL, '2021-04-15 13:04:27', NULL, '2021-04-15 13:04:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_role_vs_permission`
--

CREATE TABLE `user_role_vs_permission` (
  `userRoleId` int(11) NOT NULL,
  `userPermissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role_vs_permission`
--

INSERT INTO `user_role_vs_permission` (`userRoleId`, `userPermissionId`) VALUES
(9, 3),
(10, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_vs_permission`
--

CREATE TABLE `user_vs_permission` (
  `userId` int(11) NOT NULL,
  `userPermissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_vs_seller_vs_role`
--

CREATE TABLE `user_vs_seller_vs_role` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vs_seller_vs_role`
--

INSERT INTO `user_vs_seller_vs_role` (`id`, `userId`, `sellerId`, `roleId`) VALUES
(2, 5, 4, 9),
(3, 6, NULL, 10),
(4, 7, 5, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_transaction`
--
ALTER TABLE `pay_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_0477391dbbea4d05cbb197bf36` (`shopTitle`),
  ADD UNIQUE KEY `IDX_817140b0d3638f80c3f6021179` (`shopId`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `term`
--
ALTER TABLE `term`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_764ba585d8ac1008322ad4c9a6` (`title`);

--
-- Indexes for table `term_value`
--
ALTER TABLE `term_value`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_c4d31786102215a006bfd061f0` (`slug`),
  ADD KEY `FK_0c033125c4c6cc18828ef0eaabd` (`parentTermValueId`),
  ADD KEY `FK_ac7a8f070deff71bb36bdf9a6b0` (`sellerId`);

--
-- Indexes for table `term_vs_termvalue`
--
ALTER TABLE `term_vs_termvalue`
  ADD PRIMARY KEY (`termId`,`termValueId`),
  ADD KEY `IDX_881350e082825340c0523a7d3a` (`termId`),
  ADD KEY `IDX_3487196c158aecd539b64f4145` (`termValueId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role_vs_permission`
--
ALTER TABLE `user_role_vs_permission`
  ADD PRIMARY KEY (`userRoleId`,`userPermissionId`),
  ADD KEY `IDX_7671f79967952b01a26ba70db5` (`userRoleId`),
  ADD KEY `IDX_1192d69b60c6893f9cbbdd9f61` (`userPermissionId`);

--
-- Indexes for table `user_vs_permission`
--
ALTER TABLE `user_vs_permission`
  ADD PRIMARY KEY (`userId`,`userPermissionId`),
  ADD KEY `IDX_7495954873cd0f8e88519536b7` (`userId`),
  ADD KEY `IDX_931aebdc6a47de4d05b2875e05` (`userPermissionId`);

--
-- Indexes for table `user_vs_seller_vs_role`
--
ALTER TABLE `user_vs_seller_vs_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d9e0451464f6e49b2bcfedcf2a2` (`userId`),
  ADD KEY `FK_3009aa11776da2d9d0bfc9e993d` (`sellerId`),
  ADD KEY `FK_1db03f6cd47421e26841c6fbb9a` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pay_transaction`
--
ALTER TABLE `pay_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `term`
--
ALTER TABLE `term`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `term_value`
--
ALTER TABLE `term_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_vs_seller_vs_role`
--
ALTER TABLE `user_vs_seller_vs_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `term_value`
--
ALTER TABLE `term_value`
  ADD CONSTRAINT `FK_0c033125c4c6cc18828ef0eaabd` FOREIGN KEY (`parentTermValueId`) REFERENCES `term_value` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ac7a8f070deff71bb36bdf9a6b0` FOREIGN KEY (`sellerId`) REFERENCES `seller` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `term_vs_termvalue`
--
ALTER TABLE `term_vs_termvalue`
  ADD CONSTRAINT `FK_3487196c158aecd539b64f4145d` FOREIGN KEY (`termValueId`) REFERENCES `term_value` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_881350e082825340c0523a7d3a7` FOREIGN KEY (`termId`) REFERENCES `term` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_role_vs_permission`
--
ALTER TABLE `user_role_vs_permission`
  ADD CONSTRAINT `FK_1192d69b60c6893f9cbbdd9f619` FOREIGN KEY (`userPermissionId`) REFERENCES `user_permission` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_7671f79967952b01a26ba70db57` FOREIGN KEY (`userRoleId`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_vs_permission`
--
ALTER TABLE `user_vs_permission`
  ADD CONSTRAINT `FK_7495954873cd0f8e88519536b7c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_931aebdc6a47de4d05b2875e05b` FOREIGN KEY (`userPermissionId`) REFERENCES `user_permission` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_vs_seller_vs_role`
--
ALTER TABLE `user_vs_seller_vs_role`
  ADD CONSTRAINT `FK_1db03f6cd47421e26841c6fbb9a` FOREIGN KEY (`roleId`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3009aa11776da2d9d0bfc9e993d` FOREIGN KEY (`sellerId`) REFERENCES `seller` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d9e0451464f6e49b2bcfedcf2a2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
