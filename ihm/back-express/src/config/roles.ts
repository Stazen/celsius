const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  root: ['getUsers', 'manageUsers', 'manageAdmins'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
