-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 10:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nib_stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbcategory`
--

CREATE TABLE `tbcategory` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `reg_dtime` int(30) NOT NULL,
  `del_dtime` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbdepartment`
--

CREATE TABLE `tbdepartment` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(40) NOT NULL,
  `room_no` varchar(10) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbitem`
--

CREATE TABLE `tbitem` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `status_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbrequest`
--

CREATE TABLE `tbrequest` (
  `request_id` int(11) NOT NULL,
  `request_date` varchar(30) NOT NULL,
  `department_id` int(11) NOT NULL,
  `requester` varchar(50) NOT NULL,
  `remark` varchar(250) DEFAULT NULL,
  `request_form` varchar(250) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbrequest_detial`
--

CREATE TABLE `tbrequest_detial` (
  `request_detail_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `request_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbstatus`
--

CREATE TABLE `tbstatus` (
  `status_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbupdate_stock`
--

CREATE TABLE `tbupdate_stock` (
  `stock_id` int(11) NOT NULL,
  `stock_date` varchar(30) NOT NULL,
  `item_id` int(11) NOT NULL,
  `old_qty` int(11) NOT NULL,
  `new_qty` int(11) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbuser`
--

CREATE TABLE `tbuser` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `login_name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `level` int(11) NOT NULL,
  `user_status` varchar(30) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbcategory`
--
ALTER TABLE `tbcategory`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tbdepartment`
--
ALTER TABLE `tbdepartment`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `tbitem`
--
ALTER TABLE `tbitem`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `tbrequest`
--
ALTER TABLE `tbrequest`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `tbrequest_detial`
--
ALTER TABLE `tbrequest_detial`
  ADD PRIMARY KEY (`request_detail_id`);

--
-- Indexes for table `tbstatus`
--
ALTER TABLE `tbstatus`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `tbupdate_stock`
--
ALTER TABLE `tbupdate_stock`
  ADD PRIMARY KEY (`stock_id`);

--
-- Indexes for table `tbuser`
--
ALTER TABLE `tbuser`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbcategory`
--
ALTER TABLE `tbcategory`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbdepartment`
--
ALTER TABLE `tbdepartment`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbitem`
--
ALTER TABLE `tbitem`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbrequest`
--
ALTER TABLE `tbrequest`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbrequest_detial`
--
ALTER TABLE `tbrequest_detial`
  MODIFY `request_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbstatus`
--
ALTER TABLE `tbstatus`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbupdate_stock`
--
ALTER TABLE `tbupdate_stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbuser`
--
ALTER TABLE `tbuser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
