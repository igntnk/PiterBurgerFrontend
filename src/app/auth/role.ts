export enum ROLE{
  SUPER_USER = 'SUPER_USER',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
  CUSTOMER = 'CUSTOMER'
}

export const ROLE_MAPPER = {
[ROLE.SUPER_USER]: 'SUPER_USER',
[ROLE.MANAGER]:'MANAGER',
[ROLE.WORKER]:'WORKER',
[ROLE.CUSTOMER]:'CUSTOMER'
}
