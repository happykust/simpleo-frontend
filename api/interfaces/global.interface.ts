/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {UUID} from "crypto";

export interface Auditable {
    id: UUID,
    create_at: Date,
    updated_at: Date | null
}