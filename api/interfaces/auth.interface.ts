/*
 * Copyright (C) Cyberzone MIREA, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export const allowedPermissionsEnum = {
    // BOOKING MANAGEMENT MODULE PERMISSIONS
    BOOKING_MANAGEMENT: {
        can_activate: "booking_view",
    },

    // DEVICE MANAGEMENT MODULE PERMISSIONS
    DEVICE_MANAGEMENT: {
        can_activate: "device_view",
    },

    // USERS MANAGEMENT MODULE PERMISSIONS
    USERS_MANAGEMENT: {
        can_activate: "users_view"
    },

    // SYSTEM MANAGEMENT MODULE PERMISSIONS
    SYSTEM_MANAGEMENT: {
        can_activate: "system_view",
    },
}

export interface ILoginCredentials {
    login: string,
    password: string
}

export interface IAuthTokens {
    access_token: string,
    refresh_token: string,
}

export interface IRefreshTokensData {
    refresh_token: string,
}
