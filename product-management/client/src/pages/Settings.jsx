import { useState, useEffect } from "react";

const defaultSettings = {
    adminName: "Admin",
    email: "admin@example.com",
    currency: "INR"
};

function getSavedSettings() {
    try {
        const saved = localStorage.getItem("productManagerSettings");
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
}

export default function Settings() {
    const [settings, setSettings] = useState(getSavedSettings);
    const [saved, setSaved] = useState(false);
    const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || "Admin"
);

const [email, setEmail] = useState(
    localStorage.getItem("adminEmail") || "admin@example.com"
);

const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
);

    function handleChange(e) {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
        setSaved(false);
    }

function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("adminName", adminName);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("currency", currency);

    window.dispatchEvent(new Event("adminProfileUpdated"));

    setSaved(true);
}
    return (
        <div style={{ color: "#172b4d", maxWidth: 850 }}>
            <h1 style={{ marginBottom: 8 }}>Settings</h1>
            <p style={{ color: "#77849a", marginBottom: 28 }}>
                Manage your profile and inventory preferences.
            </p>

            <form
                onSubmit={handleSubmit}
                style={{
                    background: "white",
                    border: "1px solid #e5eaf2",
                    borderRadius: 12,
                    padding: 26,
                    boxShadow: "0 3px 12px rgba(20,40,80,.035)"
                }}
            >
                <h2 style={{ fontSize: 19, marginTop: 0 }}>
                    Administrator Profile
                </h2>

                <label style={labelStyle}>Administrator name</label>
                <input
                    name="adminName"
                    value={settings.adminName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <label style={labelStyle}>Email address</label>
                <input
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <div style={{
                    borderTop: "1px solid #edf0f5",
                    marginTop: 28,
                    paddingTop: 24
                }}>
                    <h2 style={{ fontSize: 19 }}>Inventory Preferences</h2>

                    <label style={labelStyle}>Currency</label>
                    <select
                        name="currency"
                        value={settings.currency}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="INR">Indian Rupee (₹ INR)</option>
                        <option value="USD">US Dollar ($ USD)</option>
                        <option value="EUR">Euro (€ EUR)</option>
                    </select>
                </div>

                <button type="submit" style={{
                    marginTop: 26,
                    background: "#2878ed",
                    color: "white",
                    border: 0,
                    borderRadius: 8,
                    padding: "12px 18px",
                    fontWeight: 650,
                    cursor: "pointer"
                }}>
                    Save Preferences
                </button>

                {saved && (
                    <p style={{ color: "#168451", marginBottom: 0 }}>
                        ✓ Settings saved successfully!
                    </p>
                )}
            </form>
        </div>
    );
}

const labelStyle = {
    display: "block",
    marginTop: 20,
    fontWeight: 600
};

const inputStyle = {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 520,
    marginTop: 9,
    padding: "12px 14px",
    border: "1px solid #dce3ed",
    borderRadius: 8,
    background: "white",
    color: "#172b4d",
    fontSize: 14
};