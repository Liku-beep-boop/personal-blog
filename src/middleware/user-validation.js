export class Validation {
    static username(username) {
        if (typeof username !== "string") throw new Error("Username must be a string");
        if (username.length < 3) throw new Error("Username must be at least 3 characters long");
        if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error("Username can only contain letters, numbers, and underscores");
    }

    static password(password) {
        if (typeof password !== "string") throw new Error("Password must be a string");
        if (password.length < 6) throw new Error("Password must be at least 6 characters long");
        if (!/[A-Z]/.test(password)) throw new Error("Password must contain at least one uppercase letter");
        if (!/[a-z]/.test(password)) throw new Error("Password must contain at least one lowercase letter");
        if (!/[0-9]/.test(password)) throw new Error("Password must contain at least one number");
    }
}
