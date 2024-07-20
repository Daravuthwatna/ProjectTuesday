-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 03:40 AM
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
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbcategory`
--

INSERT INTO `tbcategory` (`category_id`, `category_name`, `reg_dtime`, `del_dtime`) VALUES
(1, 'Tool', '2024-07-09', '2024-07-09'),
(2, 'Electronics', '2024-07-10', NULL),
(3, 'Book', '2024-07-09', '2024-07-09'),
(4, 'Drink', '2024-07-08', NULL),
(5, 'Computer', '2024-07-01', '2024-07-09'),
(6, 'Clothes', '2024-07-09', NULL),
(7, 'Fruit', '2024-07-08', NULL);

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

--
-- Dumping data for table `tbdepartment`
--

INSERT INTO `tbdepartment` (`department_id`, `department_name`, `room_no`, `reg_dtime`, `del_dtime`) VALUES
(1, 'Sales', 'A-01', '2024-07-06', NULL),
(2, 'IT', 'A-02', '2024-07-06', NULL),
(3, 'Banking', 'A-03', '2024-07-02', NULL),
(4, 'Marketing', 'A-04', '2024-07-06', NULL),
(5, 'English', 'A-05', '2024-06-29', NULL),
(6, 'Chinese', 'A-06', '2024-06-30', '2024-07-06'),
(7, 'Japanese', 'A-07', '2024-06-30', '2024-07-06'),
(8, 'Bitcoin', 'A-08', '2024-07-02', '2024-07-06'),
(9, 'Accounting', 'A-09', '2024-07-02', NULL),
(10, 'Human Resources', 'A-10', '2024-07-05', NULL),
(11, 'Wrestling', 'A-11', '2024-07-06', '2024-07-06'),
(12, 'Finances', 'A-12', '2024-07-06', NULL),
(13, 'Entrepreneurship', 'A-13', '2024-07-06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbitem`
--

CREATE TABLE `tbitem` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `unit` int(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbitem`
--

INSERT INTO `tbitem` (`item_id`, `item_name`, `unit`, `quantity`, `price`, `description`, `status`, `category`, `reg_dtime`, `del_dtime`) VALUES
(1, 'Apple', 4, 100, 0.6, 'Best Fruit Ever', 4, 7, '2024-07-11', NULL),
(2, 'Orange', 4, 100, 1.5, 'Best Fruit Ever', 4, 7, '2024-07-11', NULL),
(3, 'Coca-Cola', 1, 200, 1.9, 'Best Drink Ever', 5, 4, '2024-07-09', NULL),
(4, 'Fanta', 1, 300, 0.8, 'Best Drink Ever', 5, 4, '2024-07-09', NULL),
(5, 'Vital', 2, 500, 0.5, 'Most Sale Ever', 5, 4, '2024-07-09', NULL),
(6, 'Samsung Galaxy 21', 5, 10, 175, 'Best Phone Ever', 5, 2, '2024-07-15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbposition`
--

CREATE TABLE `tbposition` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(30) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbposition`
--

INSERT INTO `tbposition` (`position_id`, `position_name`, `reg_dtime`, `del_dtime`) VALUES
(2, 'Admin', '2024-07-04', NULL),
(3, 'User', '2024-07-05', NULL),
(4, 'Guest', '2024-07-04', '2024-07-09'),
(5, 'CEO', '2024-07-05', '2024-07-09'),
(6, 'Hight Chief', '2024-07-06', '2024-07-09');

-- --------------------------------------------------------

--
-- Table structure for table `tbrequest`
--

CREATE TABLE `tbrequest` (
  `request_id` int(11) NOT NULL,
  `request_date` varchar(30) NOT NULL,
  `department` int(11) NOT NULL,
  `requester` varchar(50) NOT NULL,
  `remark` varchar(250) DEFAULT NULL,
  `request_form` varchar(250) DEFAULT NULL,
  `user` int(11) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbrequest`
--

INSERT INTO `tbrequest` (`request_id`, `request_date`, `department`, `requester`, `remark`, `request_form`, `user`, `del_dtime`) VALUES
(17, '2024-07-16', 1, 'Cm Punk', '', '', 2, NULL);

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

--
-- Dumping data for table `tbrequest_detial`
--

INSERT INTO `tbrequest_detial` (`request_detail_id`, `item_id`, `quantity`, `request_id`) VALUES
(3, 2, 20, 17);

-- --------------------------------------------------------

--
-- Table structure for table `tbstatus`
--

CREATE TABLE `tbstatus` (
  `status_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbstatus`
--

INSERT INTO `tbstatus` (`status_id`, `status`, `reg_dtime`, `del_dtime`) VALUES
(1, 'In-Progress', '2024-07-04', '2024-07-08'),
(2, 'Pending', '2024-07-04', '2024-07-08'),
(3, 'Suspended', '2024-07-04', '2024-07-08'),
(4, 'Inactive', '2024-07-05', NULL),
(5, 'Active', '2024-07-05', NULL);

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
  `level` int(30) NOT NULL,
  `user_status` int(11) NOT NULL,
  `reg_dtime` varchar(30) NOT NULL,
  `del_dtime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbuser`
--

INSERT INTO `tbuser` (`user_id`, `user_name`, `login_name`, `password`, `level`, `user_status`, `reg_dtime`, `del_dtime`) VALUES
(1, 'Daravuthwatna', 'watna', '1234', 2, 5, '2024-07-09', NULL),
(2, 'John Sey', 'john sey', '1234', 3, 5, '2024-07-09', NULL),
(3, 'Post Malone', 'malone', '1234', 2, 4, '2024-07-09', NULL),
(4, 'LyMengLong', 'Imnotme', '1234', 3, 4, '2024-07-09', NULL),
(5, 'tube', 'tubeCoffee', '1234', 3, 5, '2024-07-09', '2024-07-09'),
(6, 'Jame Robert', 'robert', '1234', 3, 5, '2024-07-06', NULL),
(7, 'John', 'HomeLander', '1234', 2, 4, '2024-07-09', NULL),
(8, 'Long Vichet', 'vichet', '1234', 2, 4, '2024-07-09', NULL),
(9, 'Travis Scott', 'travis', '1234', 3, 5, '2024-07-09', NULL);

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
-- Indexes for table `tbposition`
--
ALTER TABLE `tbposition`
  ADD PRIMARY KEY (`position_id`);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbdepartment`
--
ALTER TABLE `tbdepartment`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbitem`
--
ALTER TABLE `tbitem`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbposition`
--
ALTER TABLE `tbposition`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbrequest`
--
ALTER TABLE `tbrequest`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbrequest_detial`
--
ALTER TABLE `tbrequest_detial`
  MODIFY `request_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbstatus`
--
ALTER TABLE `tbstatus`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbupdate_stock`
--
ALTER TABLE `tbupdate_stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbuser`
--
ALTER TABLE `tbuser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
