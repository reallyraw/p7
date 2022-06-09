-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 09 juin 2022 à 14:32
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_id_post` int NOT NULL,
  `comment_author` int NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_author` (`comment_author`),
  KEY `comments_ibfk_1` (`comment_id_post`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_id_post`, `comment_author`, `comment_date`, `comment_text`) VALUES
(1, 1, 1, '2022-06-07 15:22:43', 'huhu'),
(2, 1, 1, '2022-06-07 15:51:30', 'Okay'),
(5, 1, 1, '2022-06-07 17:50:08', 'Salut');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `like_post_id` int NOT NULL,
  `like_user_id` int NOT NULL,
  PRIMARY KEY (`like_id`),
  KEY `like_username` (`like_user_id`),
  KEY `likes_ibfk_1` (`like_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`like_id`, `like_post_id`, `like_user_id`) VALUES
(4, 1, 15),
(13, 5, 15);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_id_author` int NOT NULL,
  `post_date_created` datetime NOT NULL,
  `post_description` text NOT NULL,
  `post_image` varchar(255) NOT NULL,
  `post_likes` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `posts_ibfk_1` (`post_id_author`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_id`, `post_id_author`, `post_date_created`, `post_description`, `post_image`, `post_likes`) VALUES
(1, 1, '2022-05-27 15:22:21', ' heyyy', 'http://localhost:5500/images/default.png', 0),
(4, 1, '2022-06-07 19:57:57', 'ffh', 'http://localhost:5500/images/vue_du_ciel.JPG1654624677703.jpg', 0),
(5, 1, '2022-06-07 20:35:47', 'La Tour', 'http://localhost:5500/images/Signal_entrée.JPG1654626947672.jpg', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_firstname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_pp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_name`, `user_firstname`, `password`, `user_pp`) VALUES
(1, 'antoine.becuwe@gmail.com', 'reallyraw', 'Antoine', '$2b$10$crxVv117O857PMLEB1L.Z.eI5KpQOjzPtPMHeICi/uMuGH64eOEN2', 'http://localhost:5500/images/Patio_vue_du_ciel2.jpg1654692484128.jpg'),
(2, 'jumyp@mailinator.com', 'Fowler', 'Savannah', '$2b$10$CZFQEnkSlzwUCsUtr/7giuPnaqIg/BcQbk2LvRHXujCDByM2DdVQC', 'http://localhost:5500/images/users/default.png'),
(3, 'kyvaq@mailinator.com', 'Koch', 'Magee', '$2b$10$Hm4KkMsRcRQ67RKYvUGV8evxBpTyq8Xcfnl9htbqtv6tftnfP19w2', 'http://localhost:5500/images/users/default.png'),
(4, 'zipa@mailinator.com', 'David', 'Rana', '$2b$10$q9R5arF48BFWtqI7KYcznev5MJBZ5ifF96Kn6bPf49SF5shj6Mzz2', 'http://localhost:5500/images/users/default.png'),
(5, 'delygek@mailinator.com', 'Gay', 'Nelle', '$2b$10$6im2KBrvmKEGaqNbH0JkhOAF8ePfYOhRdmJNJpZAayjCaCAeN4DDC', 'http://localhost:5500/images/users/default.png'),
(7, 'lewamoka@mailinator.com', 'Vasquez', 'Candice', '$2b$10$CLtX8rnxaK925m4Jy3lhFeEFlnwa/8no5L2tObCRn/A0Tl8IDHQFy', 'http://localhost:5500/images/users/default.png'),
(8, 'kegez@mailinator.com', 'Cook', 'Montana', '$2b$10$VEacafHb4cC8m4Rq3Ozxd.wJfBGw6ZLNfWLW.qjDzcQWUlBP.rIB2', 'http://localhost:5500/images/users/default.png'),
(9, 'likyma@mailinator.com', 'Landry', 'Benjamin', '$2b$10$0qfFxPYdpAw3UT1jNUvzauUGqbSpDQQ8Xj3vJ/mB2GaoWLYiY.p4y', 'http://localhost:5500/images/users/default.png'),
(10, 'jyfuda@mailinator.com', 'Walker', 'Maya', '$2b$10$EGUvJkwq5xtFZCPtqkl2UOiHRyYNt4O2SY/JJrxiZganmxdHNs0fu', 'http://localhost:5500/images/users/default.png'),
(11, 'juca@mailinator.com', 'Harrison', 'Kirby', '$2b$10$nbDEa4K/XmgrpHiAWEUs8O6ws4V21b6vwAnU/Tc67YoYPYA0q2rmK', 'http://localhost:5500/images/users/default.png'),
(12, 'lujit@mailinator.com', 'Wyatt', 'Dolan', '$2b$10$Pxz.RWOiF2UYGHkgZ7WtsOn7Uy83FoqQz5tYHkvYs9ClQ6vDOvwuu', 'http://localhost:5500/images/users/default.png'),
(13, 'antoine.becwe@gmail.com', 'Arnold', 'Finn', '$2b$10$3brDnzRVOZWaHkZUs68X9OBa3EQbItJPki.WGlGkdTs4bx0WWyCCu', 'http://localhost:5500/images/users/default.png'),
(14, 'ceryr@mailinator.com', 'Kidd', 'Yael', '$2b$10$yKlP.k0vhVv8VZXIfzJiI.7K8zl8NEpUrkGoIisVoyMcN6GrxnkLq', 'http://localhost:5500/images/default.png'),
(15, 'maxa@mailinator.com', 'Alvarado', 'William', '$2b$10$Zu8Ewjg1cCZW9Ay707lo1OQD9HK0ztwZ7a2r26QMfXeveI5W/6X5G', 'http://localhost:5500/images/default.png');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`comment_id_post`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`comment_author`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`like_post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`like_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_id_author`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
