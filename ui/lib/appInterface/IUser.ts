interface Name {
    first: string;
    last: string;
    full: string;
}

interface Location {
    latitude: number | null;
    longitude: number | null;
    address: string | null;
}

interface Address {
    line: string;
    state: string;
    city: string;
    zipCode: string;
}

interface PreferenceId {
    tenantLimit: {
        user: number;
        data: number;
    };
    appSetting: {
        appTiming: {
            isEnabled: boolean
            from: number | null;
            to: number | null;
        };
        isWorkOn: boolean;
        isDisableScreenshots: boolean;
    };
    appCharge: {
        qrCode: string | null;
        charge: number;
        message: string;
    };
    userDefaultSetting: {
        isAppOnline: boolean;
        isOnlineSearch: boolean;
        isLocationOn: boolean;
        visibleVehicleFields: string[];
    };
    _id: string;
    tenantId: string;
    features: any[]; // Assuming this is an array of some type
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UserPreferenceId {
    _id: string | null,
    userId: string | null,
    isAppOnline: boolean,
    isOnlineSearch: boolean,
    isLocationOn: boolean,
    visibleVehicleFields: string[],
    isDuplicateSearchEnable: boolean,
};

export interface ITenant {
    address: Address;
    _id: string;
    code: string;
    name: string;
    logo: string;
    url: string;
    firebaseInstanceVersion: string;
    confirmNumbers: any[]; // { name, number }
    preferenceId: PreferenceId;
}

export interface IUserPreference {
    isAppOnline: boolean
    isOnlineSearch: boolean
    isLocationOn: boolean
    visibleVehicleFields: string[]
    isDuplicateSearchEnable: boolean
}

export interface IUser {
    _id: string;
    name: Name;
    location: Location;
    pin: {
        isSet: boolean,
    },
    tenantId: string,
    storageKey: string;
    phoneNumber: string;
    roleId: IRole;
    password: string;
    isOnline: boolean;
    appExpiryAt: string | null;
    assignedVehicleType: any[]; // Assuming this is an array of some type
    emailAddress: string;
    preferenceId: IUserPreference;
}

export interface IRole {
    _id: string,
    name: string,
    tag: string,
    isDeleted: boolean,
    updatedAt: Date,
    createdAt: Date
}
