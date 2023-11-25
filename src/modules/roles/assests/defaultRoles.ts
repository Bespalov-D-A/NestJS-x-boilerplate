import { CreateRoleDto } from "../dto/create-role.dto";

export enum defaultRolesName {
    Default = 'Default',
    Moderator = 'Moderator',
    Marketing = 'Marketing',
    Analytic = 'Analytic'
}

export const defaultRoles: CreateRoleDto[] = [
    {
        value: defaultRolesName.Default,
        description: 'This is common role for all users'
    },
    {
        value: defaultRolesName.Moderator,
        description: 'This role has a moderation permission'
    },

    {
        value: defaultRolesName.Marketing,
        description: 'This role has permissions for marketing'
    },

    {
        value: defaultRolesName.Analytic,
        description: 'This role has permissions for analytics func'
    },
]