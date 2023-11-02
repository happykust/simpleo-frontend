/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import AuthRepository from "~/api/repositories/auth.repository";
import BoardGameRepository from "~/api/repositories/boardGame.repository";

export default {
  auth: AuthRepository,
  board_game: BoardGameRepository
}