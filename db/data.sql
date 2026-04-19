USE flashcard_app;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE user_info;
TRUNCATE TABLE user;
SET FOREIGN_KEY_CHECKS = 1;

-- INSERT INTO user (user_id, password, score, Admin) VALUES
--     (100, "$2y$10$8emsdReOgGZe/Bd9xAuabe5x/yxiLkX7JtYOFcRUjyB0xhObEtyS2", 0, FALSE),
--     (101, "$2y$10$TnDetc9ZgcuNISGl91ft6.7HzPUAAqPHya2ksL3VH9D1SuqA58twe", 0, TRUE),
--     (102, "$2y$10$O7Uttkbv6f48nkZVhlwfVeUlWSWe9utrJEtEyhg7Bd8Wh87zVaYkW", 0, FALSE),
--     (103, "$2y$10$vUkH.Ne/RZGCg.Moh2i7TeFm1DYJozMaONwwU28Agmj2HNaDXWjI.", 0, FALSE);

INSERT INTO `user` (`user_id`, `password`, `score`, `admin`) VALUES
(1, '$2y$10$7UbVP2FnyEQfNK57Uszlue9RggRIpstgwSsAwFlTWKdPVXnhOo0EG', 100, 0),
(100, '$2y$10$8emsdReOgGZe/Bd9xAuabe5x/yxiLkX7JtYOFcRUjyB0xhObEtyS2', 1, 0),
(101, '$2y$10$TnDetc9ZgcuNISGl91ft6.7HzPUAAqPHya2ksL3VH9D1SuqA58twe', 1, 1),
(102, '$2y$10$O7Uttkbv6f48nkZVhlwfVeUlWSWe9utrJEtEyhg7Bd8Wh87zVaYkW', 1, 0),
(103, '$2y$10$vUkH.Ne/RZGCg.Moh2i7TeFm1DYJozMaONwwU28Agmj2HNaDXWjI.', 0, 0),
(104, '$2y$10$VlLqO8cmWdvFVaSgfpmNsuxLuO.NEx.nwFhyYCm4AbruZ6u4xwFw.', 1, 0),
(105, '$2y$10$vqx/REjusYCl5IhQ19FsXeQCNvQB/HVbNxo.U0.5di31wYHBowwEq', 1, 0),
(106, '$2y$10$I7FnOuNlUPn2VtkuZ/S2oO/UTFhZNmEd4Uwd8aAJXpYk3Vplb62QK', 1, 0),
(107, '$2y$10$3M2fyzY2yem.P3aUajfA/OXy3SkAxW28AK4tDF9OpHioNbEmHxuHm', 1, 0),
(108, '$2y$10$D19ysqqZt46CpEqv1f/sJ.durdW7pAtojhv/ZUFz0yNUt1PttQTNC', 1, 0),
(109, '$2y$10$XA9WTygzWg.A3TiyXbuGg.UKnn6BizYzkX2MgLZoXNg86vcZY8j6O', 1, 0),
(110, '$2y$10$p1/AheWpdKljpfNudtnV7ut0giJycbJlD54ZOIflUkv/dI2MuamZq', 1, 0);

-- INSERT INTO user_info(info_user_id, fname, lname, image, role, department, location, wildcard) VALUES
--     (100, "Raymond", "Didonato", "backend/uploads/users/giraffe.png", "Some kind of Dev", "Development", "Desk 1984", "Does not eat at chilis"),
--     (101, "Samuel", "Belanger", "backend/uploads/users/lizard.png", "Back-end Dev", "Department of snacks", "Building Alpha, 39th floor", "Plays geometry dash"),
--     (102, "Gabriel", "Ball", "backend/uploads/users/otter.png", "Front-end Dev", "HR", "Desk -1", "Doesn't like his senior design group"),
--     (103, "Lohann", "spy_tf2", "backend/uploads/users/toucan.png", "Creative lead", "Department of the sinkhole", "The sinkhole", "Has a butterfly knife and a disguise kit");

INSERT INTO `user_info` (`info_user_id`, `fname`, `lname`, `image`, `role`, `department`, `location`, `wildcard`) VALUES
(1, '\"0\"', '\"0\"', 'backend/uploads/users/angler.png', 'integer', 'computing', 'your walls', '\"0\"'),
(100, 'Raymond', 'Didonato', 'backend/uploads/users/giraffe.png', 'Some kind of Dev', 'Development', 'Desk 1984', 'Does not eat at chilis'),
(101, 'Samuel', 'Belanger', 'backend/uploads/users/lizard.png', 'Back-end Dev', 'Department of snacks', 'Building Alpha, 39th', 'Plays geometry dash'),
(102, 'Gabriel', 'Ball', 'backend/uploads/users/otter.png', 'Front-end Dev', 'HR', 'Desk -1', "Doesn't like his senior design group"),
(103, 'Lohann', 'spy_tf2', 'backend/uploads/users/toucan.png', 'Creative lead', 'Department of the sinkhole', 'The sinkhole', 'Has a butterfly knife and a disguise kit'),
(104, 'John', 'Helldiver', 'backend/uploads/users/human.png', 'Helldiver', 'Super Earth', 'Super Destroyer #358', 'can input hellbomb in .3 seconds'),
(105, 'Steve', 'Minecraft', 'backend/uploads/users/human.png', 'Builder', 'Gaming', 'The Nether', 'can lift 619,887,012,480 kg (real)'),
(106, 'Bilbo', 'The hobbit', 'backend/uploads/users/human.png', 'Ring Carrier', 'The Fellowship of the Ring', 'Middle-Earth', 'has very large feet'),
(107, 'Rexy', 'T', 'backend/uploads/users/lizard.png', 'None', 'None', 'Jurassic Park', 'is totally not gonna eat you'),
(108, 'Farquaad', 'Lord', 'backend/uploads/users/toucan.png', 'Useless', 'Executive Board', 'The Castle', 'is willing to make the sacrifice'),
(109, 'Cat', "Dr. J's", 'backend/uploads/users/drjcat.png', 'being Cute', 'Cuteness', "Dr. J\'s house", 'Dr. J wants to eat my cat Kimchi'),
(110, 'Barry', 'B. Benson', 'backend/uploads/users/toucan.png', 'Lawyer', 'Legal', 'Yellow Flower Pot', 'likes jazz');