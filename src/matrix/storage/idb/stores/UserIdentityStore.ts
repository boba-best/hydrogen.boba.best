/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {Store} from "../Store";

interface UserIdentity {
    userId: string;
    roomIds: string[];
    deviceTrackingStatus: number;
}

export class UserIdentityStore {
    private _store: Store<UserIdentity>;

    constructor(store: Store<UserIdentity>) {
        this._store = store;
    }

    get(userId: string): Promise<UserIdentity | undefined> {
        return this._store.get(userId);
    }

    set(userIdentity: UserIdentity): void {
        this._store.put(userIdentity);
    }

    remove(userId: string): void {
        this._store.delete(userId);
    }
}
