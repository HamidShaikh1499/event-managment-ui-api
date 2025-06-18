import { get } from 'lodash';

import { useAppSelector } from '@/reducer/hooks';

export default function useHasPermission(permission: string) {
    const { permissions } = useAppSelector((state) => state.auth);

    return get(permissions, permission);
}
