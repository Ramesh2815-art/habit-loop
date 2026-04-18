import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faUser, faTableColumns, faTornado } from '@fortawesome/free-solid-svg-icons';

export type MenuItem = {
    id: number;
    label: string;
    icon: IconDefinition;
    path: string;
    iconColor: string;
};



export const menuBar: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        icon: faTableColumns,
        path: '/dashboard',
        iconColor: '#5E72E4'
    },
    {
        id: 2,
        label: 'Todo',
        icon: faTornado,
        path: '/todo',
        iconColor: '#11CDEF'
    },
]
