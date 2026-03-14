import { Settings, User, Bell, Shield, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const settingsOptions = [
    {
      icon: User,
      label: "Account Settings",
      description: "Manage your profile and preferences",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Configure alerts and sounds",
    },
    {
      icon: Shield,
      label: "Security",
      description: "Update password and security settings",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-8 bg-gray-50 overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage your application preferences
        </p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-primary-purple hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-primary-purple/5 text-primary-purple rounded-xl flex items-center justify-center group-hover:bg-primary-purple group-hover:text-white transition-colors">
                <option.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {option.label}
                </h3>
                <p className="text-gray-500 text-sm">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
