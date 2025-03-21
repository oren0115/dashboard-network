"use client";

import { useState } from "react";
import { Card, Badge } from "@tremor/react";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

interface Log {
  id: number;
  timestamp: string;
  level: "info" | "warning" | "error";
  source: string;
  message: string;
  details: string;
}

export default function LogsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  // Sample logs data - in a real app, this would come from your backend
  const [logs] = useState<Log[]>([
    {
      id: 1,
      timestamp: "2025-03-21 11:30:00",
      level: "error",
      source: "Core Router",
      message: "Interface GigabitEthernet1/0/1 down",
      details: "Link down detected on main uplink interface",
    },
    {
      id: 2,
      timestamp: "2025-03-21 11:25:00",
      level: "warning",
      source: "Distribution Switch",
      message: "High CPU utilization",
      details: "CPU usage at 75% for past 5 minutes",
    },
    {
      id: 3,
      timestamp: "2025-03-21 11:20:00",
      level: "info",
      source: "Access Point",
      message: "New client connected",
      details: "Client MAC: 00:11:22:33:44:55",
    },
    {
      id: 4,
      timestamp: "2025-03-21 11:15:00",
      level: "info",
      source: "Firewall",
      message: "Security policy updated",
      details: "New rules applied for VLAN 100",
    },
    {
      id: 5,
      timestamp: "2025-03-21 11:10:00",
      level: "warning",
      source: "Core Router",
      message: "BGP neighbor down",
      details: "Lost connection to ISP1 peer",
    },
  ]);

  // Get unique sources for filter dropdown
  const sources = ["all", ...new Set(logs.map((log) => log.source))];

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel;
    const matchesSource =
      selectedSource === "all" || log.source === selectedSource;

    return matchesSearch && matchesLevel && matchesSource;
  });

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-gray-600">
              You need administrator privileges to view logs.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">System Logs</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and analyze system and network logs
            </p>
          </div>
        </div>

        <Card>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700">
                  Search Logs
                </label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search messages, details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700">
                  Log Level
                </label>
                <select
                  id="level"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}>
                  <option value="all">All Levels</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <select
                  id="source"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source === "all" ? "All Sources" : source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Level
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Source
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.timestamp}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <Badge
                            color={
                              log.level === "error"
                                ? "red"
                                : log.level === "warning"
                                ? "yellow"
                                : "blue"
                            }>
                            {log.level}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {log.source}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {log.message}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
