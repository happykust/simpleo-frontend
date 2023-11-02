/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {UUID} from "crypto";

export const allowedPermissionsEnum = {
    // SYSTEM MANAGEMENT MODULE PERMISSIONS
    system: {
        can_activate: "system_state_select",
        can_update: "system_state_update"
    },

    // AUDIT MANAGEMENT MODULE PERMISSIONS
    audit: {
        can_activate: "system_audit_log_select",
    },

    // USERS MANAGEMENT MODULE PERMISSIONS
    user: {
        can_activate: "auth_user_select",
        can_add: "auth_user_insert",
        can_update: "auth_user_update",
        can_delete: "auth_user_delete"
    },

    // ROLE MANAGEMENT MODULE PERMISSIONS
    role: {
        can_activate: "auth_role_select",
        can_add: "auth_role_insert",
        can_update: "auth_role_update",
        can_delete: "auth_role_delete"
    },

    // PERMISSION MANAGEMENT MODULE PERMISSION
    permission: {
        can_activate: "auth_permission_select"
    },

    // BOOKING MANAGEMENT MODULE PERMISSIONS
    booking: {
        can_activate: "booking_select",
        can_add: "booking_insert",
        can_update: "booking_update",
        can_delete: "booking_delete"
    },

    // BOARD GAME MANAGEMENT MODULE PERMISSIONS
    board_game: {
        can_activate: "board_game_select",
        can_add: "board_game_insert",
        can_update: "board_game_update",
        can_delete: "board_game_delete"
    },

    // DEVICE MANAGEMENT MODULE PERMISSIONS
    device: {
        can_activate: "device_select",
        can_add: "device_insert",
        can_update: "device_update",
        can_delete: "device_delete"
    },

    // GIZMO DEVICE MANAGEMENT MODULE PERMISSIONS
    gizmo_device: {
        can_activate: "gizmo_device_select",
        can_add: "gizmo_device_insert",
        can_update: "gizmo_device_update",
        can_delete: "gizmo_device_delete"
    },

    // CYBERZONE DEVICE MANAGEMENT MODULE PERMISSIONS
    cyberzone_device: {
        can_activate: "cyberzone_device_select",
        can_add: "cyberzone_device_insert",
        can_update: "cyberzone_device_update",
        can_delete: "cyberzone_device_delete"
    },

    // NEWS MANAGEMENT MODULE PERMISSIONS
    news: {
        can_activate: "news_select",
        can_add: "news_insert",
        can_update: "news_update",
        can_delete: "news_delete"
    },

    // EVENT MANAGEMENT MODULE PERMISSIONS
    event: {
        can_activate: "event_select",
        can_add: "event_insert",
        can_update: "event_update",
        can_delete: "event_delete"
    },

    // ORGANIZATION MANAGEMENT MODULE PERMISSIONS
    organization: {
        can_activate: "organization_select",
        can_add: "organization_insert",
        can_update: "organization_update",
        can_delete: "organization_delete"
    },

    // TOURNAMENTS MANAGEMENT MODULE PERMISSIONS
    tournament: {
        can_activate: "tournament",
        can_add: "tournament_insert",
        can_update: "tournament_update",
        can_delete: "tournament_delete"
    }
}

export interface ILoginCredentials {
    login: string,
    password: string
}

export interface IRegisterCredentials {
    login: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
    patronymic: string | null,
    birthday: Date
}

export interface IAuthTokens {
    access_token: string,
    refresh_token: string,
}

export interface IRefreshTokensData {
    refresh_token: string,
}

export interface IRole {
    id: UUID,
    name: string
}

export interface IUser {
    id: UUID,
    username: string,
    firstname: string,
    lastname: string,
    patronymic: string,
    email: string,
    telephone: string,
    avatar_url: string,
    bio: string,
    birthday: Date,
    is_active: boolean,
    email_confirmed: boolean,
    registration_completed: boolean,
    role: IRole[],
    permissions_agg: string[],
    gizmo_profile_id: number
}
