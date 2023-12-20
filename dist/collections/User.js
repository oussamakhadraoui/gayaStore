"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "'>Verify Account</a>");
            },
        },
    },
    access: {
        create: function () { return true; },
        read: function () { return true; },
    },
    fields: [
        {
            name: 'role',
            // admin:{
            // condition: ({req}) => req.user?.role === "admin",
            // },
            required: true,
            defaultValue: 'user',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
        },
    ],
};
