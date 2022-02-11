/*
Copyright 2020 Bruno Windels <bruno@windels.cloud>

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
import {Content} from "../../types";

interface AccountDataEntry {
    type: string;
    content: Content;
}

export class AccountDataStore {
    private _store: Store<AccountDataEntry>;

    constructor(store: Store<AccountDataEntry>) {
        this._store = store;
    }

    async get(type: string): Promise<AccountDataEntry | undefined> {
        return await this._store.get(type);
    }

    set(event: AccountDataEntry): void {
        this._store.put(event);
    }
}
