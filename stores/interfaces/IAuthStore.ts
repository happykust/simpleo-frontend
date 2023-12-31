/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {IUser} from "~/api/interfaces/auth.interface";

export interface IAuthStore {
  user: IUser | null;
  error: string | null;
  loading: boolean;
}
