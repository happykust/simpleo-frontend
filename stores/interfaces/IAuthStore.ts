/*
 * Copyright (C) Cyberzone MIREA, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export interface IAuthStore {
  employee: IEmployeeState | null;
  error: string | null;
  loading: boolean;
}
