"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import PageTransition from "@/components/PageTransition";

const data = [
  { date: "2024-03-01", "Bandwidth Usage": 2890, "Packet Loss": 2338 },
  { date: "2024-03-02", "Bandwidth Usage": 2756, "Packet Loss": 2103 },
  { date: "2024-03-03", "Bandwidth Usage": 3322, "Packet Loss": 2194 },
  { date: "2024-03-04", "Bandwidth Usage": 3470, "Packet Loss": 2108 },
  { date: "2024-03-05", "Bandwidth Usage": 3475, "Packet Loss": 1812 },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <Title>Active Devices</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-green-500">24/25</div>
              <div className="text-sm text-gray-500">Devices Online</div>
            </div>
          </Card>

          <Card className="p-4">
            <Title>Network Health</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-500">98.5%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
          </Card>

          <Card className="p-4">
            <Title>Active Alerts</Title>
            <div className="mt-4">
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <div className="text-sm text-gray-500">Warning Alerts</div>
            </div>
          </Card>
        </div>

        <Card>
          <Title>Network Traffic Overview</Title>
          <AreaChart
            className="mt-4 h-72"
            data={data}
            index="date"
            categories={["Bandwidth Usage", "Packet Loss"]}
            colors={["blue", "red"]}
          />
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <Title>Recent Alerts</Title>
            <div className="mt-4 space-y-4">
              {[
                {
                  severity: "warning",
                  message: "High CPU usage on Router-01",
                  time: "10 minutes ago",
                },
                {
                  severity: "error",
                  message: "Switch-03 connection lost",
                  time: "1 hour ago",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        alert.severity === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}></span>
                    {alert.message}
                  </div>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <Title>Device Status</Title>
            <div className="mt-4 space-y-4">
              {[
                { name: "Core Router", status: "online", latency: "2ms" },
                { name: "Main Switch", status: "online", latency: "1ms" },
                { name: "Edge Router", status: "online", latency: "5ms" },
              ].map((device, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        device.status === "online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}></span>
                    {device.name}
                  </div>
                  <span className="text-sm text-gray-500">
                    Latency: {device.latency}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
