"use client";

import { useState } from "react";
import { Card, Title, Badge } from "@tremor/react";
import { useAuth } from "@/context/AuthContext";
import ConfigureAlertsModal from "@/components/ConfigureAlertsModal";
import PageTransition from "@/components/PageTransition";

interface Alert {
  id: number;
  device: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  status: string;
}

interface AlertThreshold {
  type: string;
  warning: number;
  critical: number;
  enabled: boolean;
}

export default function AlertsPage() {
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      device: "Core Router",
      type: "CPU Usage",
      severity: "warning",
      message: "CPU usage exceeded 70% threshold",
      timestamp: "2024-03-21 10:30:00",
      status: "active",
    },
    {
      id: 2,
      device: "Distribution Switch",
      type: "Memory",
      severity: "critical",
      message: "Memory usage at 90% capacity",
      timestamp: "2024-03-21 10:15:00",
      status: "active",
    },
    {
      id: 3,
      device: "Access Switch Floor 1",
      type: "Interface",
      severity: "error",
      message: "Port GigabitEthernet1/0/1 down",
      timestamp: "2024-03-21 09:45:00",
      status: "resolved",
    },
    {
      id: 4,
      device: "Wireless Controller",
      type: "Performance",
      severity: "info",
      message: "High number of client connections",
      timestamp: "2024-03-21 09:30:00",
      status: "active",
    },
  ]);

  const [thresholds, setThresholds] = useState<AlertThreshold[]>([
    { type: "CPU Usage", warning: 70, critical: 90, enabled: true },
    { type: "Memory Usage", warning: 80, critical: 95, enabled: true },
    { type: "Network Latency", warning: 100, critical: 200, enabled: true },
    { type: "Packet Loss", warning: 1, critical: 5, enabled: true },
  ]);

  const handleClearAlerts = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, status: "resolved" })));
  };

  const handleResolveAlert = (alertId: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const handleSaveThresholds = (newThresholds: AlertThreshold[]) => {
    setThresholds(newThresholds);
    // In a real application, you would also:
    // 1. Save thresholds to backend
    // 2. Update monitoring system with new thresholds
    // 3. Recalculate current alerts based on new thresholds
  };

  const getAlertCounts = () => {
    const active = alerts.filter((a) => a.status === "active");
    return {
      total: active.length,
      critical: active.filter((a) => a.severity === "critical").length,
      warning: active.filter((a) => a.severity === "warning").length,
      info: active.filter((a) => a.severity === "info").length,
    };
  };

  const counts = getAlertCounts();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Network Alerts
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Monitor and manage network alerts and notifications
            </p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3">
            <button
              onClick={handleClearAlerts}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Clear All
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsConfigureModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Configure Alerts
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <Title>Total Alerts</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold">{counts.total}</div>
              <div className="text-sm text-gray-500">Active alerts</div>
            </div>
          </Card>

          <Card className="p-4">
            <Title>Critical</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-red-500">
                {counts.critical}
              </div>
              <div className="text-sm text-gray-500">Critical alerts</div>
            </div>
          </Card>

          <Card className="p-4">
            <Title>Warning</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-yellow-500">
                {counts.warning}
              </div>
              <div className="text-sm text-gray-500">Warning alerts</div>
            </div>
          </Card>

          <Card className="p-4">
            <Title>Info</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-500">
                {counts.info}
              </div>
              <div className="text-sm text-gray-500">Info alerts</div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-4">
            <Title>Alert History</Title>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <li key={alert.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge
                          color={
                            alert.severity === "critical"
                              ? "red"
                              : alert.severity === "warning"
                              ? "yellow"
                              : alert.severity === "error"
                              ? "red"
                              : "blue"
                          }
                          className="mr-4">
                          {alert.severity}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {alert.device}
                          </p>
                          <p className="text-sm text-gray-500">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          color={alert.status === "active" ? "red" : "green"}
                          className="mr-4">
                          {alert.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {alert.timestamp}
                        </span>
                        {alert.status === "active" && isAdmin && (
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="text-sm text-blue-600 hover:text-blue-800">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <ConfigureAlertsModal
          isOpen={isConfigureModalOpen}
          onClose={() => setIsConfigureModalOpen(false)}
          onSave={handleSaveThresholds}
          currentThresholds={thresholds}
        />
      </div>
    </PageTransition>
  );
}
