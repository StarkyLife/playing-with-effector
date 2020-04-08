export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export const permissions: Permissions[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export interface GroupModel {
    id: string;
    name: string;
    permissions: Array<Permissions>;
}
