/*
Copyright 2022 New Vector Ltd

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

/*import type * as Keytar from "keytar"; // Hak dependency type

let keytar: typeof Keytar | undefined;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    keytar = require("keytar");
} catch (e) {
    if ((<NodeJS.ErrnoException>e).code === "MODULE_NOT_FOUND") {
        console.log("Keytar isn't installed; secure key storage is disabled.");
    } else {
        console.warn("Keytar unexpected error:", e);
    }
}
*/
function toStr(service: string, account: string): string {
    return 'keytar_pwd_&' + service + '&' + account;
}

const keytar = {
    getPassword: async function (service: string, account: string): Promise<string | null> {
        return localStorage.getItem(toStr(service, account));
    },
    setPassword: async function (service: string, account: string, password: string): Promise<void> {
        return localStorage.setItem(toStr(service, account), password);
    },
    deletePassword: async function (service: string, account: string): Promise<boolean> {
        localStorage.removeItem(toStr(service, account));
        return true;
    },
};

export { keytar };