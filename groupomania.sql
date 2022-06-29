-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 29 juin 2022 à 15:02
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_id_post`, `comment_author`, `comment_date`, `comment_text`) VALUES
(14, 12, 21, '2022-06-15 19:33:17', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(15, 12, 22, '2022-06-15 20:21:34', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
(18, 14, 28, '2022-06-29 16:19:25', 'J\'adore ce post !');

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`like_id`, `like_post_id`, `like_user_id`) VALUES
(36, 12, 21),
(38, 12, 22),
(39, 13, 23);

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_id`, `post_id_author`, `post_date_created`, `post_description`, `post_image`, `post_likes`) VALUES
(12, 21, '2022-06-15 19:31:12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ', 'http://localhost:5500/images/Que-signifie-Lorem-ipsum.png1655314272950.png', 0),
(13, 22, '2022-06-15 19:48:58', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem. Dis parturient montes nascetur ridiculus mus mauris vitae.', 'http://localhost:5500/images/1d543ab7_z.webp1655315338590.webp', 0),
(14, 23, '2022-06-20 15:35:23', 'Quis repudiandae eu ', 'http://localhost:5500/images/benzema-arrête.gif1655732123961.gif', 0),
(16, 28, '2022-06-29 16:20:12', 'Couverture d\'album', 'http://localhost:5500/images/R-2603555-1480640437-3344.jpeg.jpg1656512444115.jpg', 0);

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
  `user_admin` int NOT NULL DEFAULT,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_name`, `user_firstname`, `password`, `user_pp`, `user_admin`) VALUES
(1, 'antoine.becuwe@gmail.com', 'reallyraw', 'Antoine', '$2b$10$crxVv117O857PMLEB1L.Z.eI5KpQOjzPtPMHeICi/uMuGH64eOEN2', 'http://localhost:5500/images/Patio_vue_du_ciel2.jpg1654692484128.jpg', 0),
(21, 'xuko@mailinator.com', 'Suarez', 'Harding', '$2b$10$wHgfbLQjK9TXQiVW2Mv2de9U5O5pAmkkiKtVGKOfI6A3BXWOOv2tS', 'http://localhost:5500/images/image.jpg1655314155511.jpg', 0),
(22, 'lodi@mailinator.com', 'Lamb', 'Winifred', '$2b$10$9p60I0UuR7R8QiBKmeW.A.3g9W6NfJJMSJjeQKaBN7YkTLGuQ3azK', 'http://localhost:5500/images/image.jpg1655317270795.jpg', 0),
(23, 'qoqonyh@mailinator.com', 'Saunders', 'Desirae', '$2b$10$gCdQBYhUom6Bg6jsawIuOuxSbV8eon7r91jnNOJIGtx8KR1mXhkqa', '', 0),
(24, 'hituvogab@mailinator.com', 'Stokes', 'Chastity', '$2b$10$HRubL4TnXXVzYfHsnliG3OHNcUA/dIUWEz8luCzIxonmesx/uATX6', '', 0),
(25, 'dexawak@mailinator.com', 'Snyder', 'Helen', '$2b$10$BDhJCSK7yY2eqlY0A1bzauS.Ey6OQL9zMYS9tUAzybsrvs5NLR29G', '', 0),
(26, 'huqec@mailinator.com', 'Gallegos', 'Eden', '$2b$10$TA5F1rfLtuTRhBPCp/Wz8uWphnZ5s5mergX8ihoo2SznshYEThCoy', 'http://localhost:5500/images/34049138_461940594238658_6511654871572152320_n.jpg1655997495582.jpg', 0),
(27, 'admin@groupomania.fr', 'Admin', 'Admin', '$2b$10$0C51IQAkLjeVaIN74kcUDeCv4.1bcZyzGp2cHe4HDD8dEXLhC6RJ2', 'http://localhost:5500/images/groupomania.png', 1),
(28, 'kidihav@mailinator.com', 'Dillon', 'Echo', '$2b$10$8zI/UifeST0nzam5KynS3u4lMc9xDeMod0aHSvlTyaWkW0QuhFUtK', 'http://localhost:5500/images/Hauts-fonds-Acrylique-sur-toile-60-X-60-cm-scaled.jpg1656512388855.jpg', 0);

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
