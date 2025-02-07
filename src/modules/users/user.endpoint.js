import {roleType} from "../../middleware/auth.middleware.js"
export const andpoint={
    profile:[roleType.admin,roleType.user]
}