-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2021 at 12:44 PM
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
(2, 'EB100002', 'test2', 'test2', NULL, 'test1@gmail.com', NULL, NULL, NULL, NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, '2021-04-12 16:19:52', 3, '2021-04-12 16:19:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seller_vs_user`
--

CREATE TABLE `seller_vs_user` (
  `userId` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller_vs_user`
--

INSERT INTO `seller_vs_user` (`userId`, `sellerId`) VALUES
(1, 1),
(3, 2);

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
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `term_value`
--

CREATE TABLE `term_value` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, NULL, 'test@gmail.com', NULL, NULL, NULL, '$2b$08$zu.PWs2bIiZnLtbh.hZAk.sUw0LE1kA3G4QBotaaejOtS8VClcrAy', NULL, NULL, NULL, NULL, 0, 'pending', '2021-04-12 15:36:20', NULL, '2021-04-12 15:36:20', NULL),
(3, NULL, 'test1@gmail.com', NULL, NULL, NULL, '$2b$08$Ygsdw41GHB8WnWv305cItOAwOAdSTRc3doqK5vqqlmjRvtawiJGpe', NULL, NULL, NULL, NULL, 0, 'pending', '2021-04-12 16:17:48', NULL, '2021-04-12 16:17:48', NULL);

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
(1, 'shop-admin', 'active', NULL, '2021-04-12 16:04:10', NULL, '2021-04-12 16:04:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_role_vs_permission`
--

CREATE TABLE `user_role_vs_permission` (
  `userRoleId` int(11) NOT NULL,
  `userPermissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Table structure for table `user_vs_role`
--

CREATE TABLE `user_vs_role` (
  `userId` int(11) NOT NULL,
  `userRoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vs_role`
--

INSERT INTO `user_vs_role` (`userId`, `userRoleId`) VALUES
(1, 1),
(3, 1);

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
-- Indexes for table `seller_vs_user`
--
ALTER TABLE `seller_vs_user`
  ADD PRIMARY KEY (`userId`,`sellerId`),
  ADD KEY `IDX_054e9c62ee0399da2485f0d7db` (`userId`),
  ADD KEY `IDX_3a35fc18cbf07a71a3d525aa7c` (`sellerId`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `term`
--
ALTER TABLE `term`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `term_value`
--
ALTER TABLE `term_value`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `user_vs_role`
--
ALTER TABLE `user_vs_role`
  ADD PRIMARY KEY (`userId`,`userRoleId`),
  ADD KEY `IDX_a971f443e3a3afa88e25c080e3` (`userId`),
  ADD KEY `IDX_bb47b0182985ff239fd380c728` (`userRoleId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `term`
--
ALTER TABLE `term`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `term_value`
--
ALTER TABLE `term_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `seller_vs_user`
--
ALTER TABLE `seller_vs_user`
  ADD CONSTRAINT `FK_054e9c62ee0399da2485f0d7dba` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3a35fc18cbf07a71a3d525aa7c8` FOREIGN KEY (`sellerId`) REFERENCES `seller` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
-- Constraints for table `user_vs_role`
--
ALTER TABLE `user_vs_role`
  ADD CONSTRAINT `FK_a971f443e3a3afa88e25c080e3a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bb47b0182985ff239fd380c728e` FOREIGN KEY (`userRoleId`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
