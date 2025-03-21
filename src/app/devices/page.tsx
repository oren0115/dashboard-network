"use client";

import { useState } from "react";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from "@tremor/react";
import AddDeviceModal from "@/components/AddDeviceModal";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

interface Device {
  id: number;
  name: string;
  model: string;
  ip: string;
  status: string;
  uptime: string;
  lastSeen: string;
  cpu: string;
  memory: string;
  type: string;
}

export default function DevicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: "Core Router",
      model: "Cisco ISR 4431",
      ip: "192.168.1.1",
      status: "online",
      uptime: "45 days",
      lastSeen: "Just now",
      cpu: "25%",
      memory: "45%",
      type: "router",
    },
    {
      id: 2,
      name: "Distribution Switch",
      model: "Cisco Catalyst 9300",
      ip: "192.168.1.2",
      status: "online",
      uptime: "30 days",
      lastSeen: "Just now",
      cpu: "30%",
      memory: "60%",
      type: "switch",
    },
    {
      id: 3,
      name: "Access Switch Floor 1",
      model: "Cisco Catalyst 2960",
      ip: "192.168.1.3",
      status: "online",
      uptime: "15 days",
      lastSeen: "Just now",
      cpu: "15%",
      memory: "35%",
      type: "switch",
    },
    {
      id: 4,
      name: "Wireless Controller",
      model: "Cisco 9800",
      ip: "192.168.1.4",
      status: "warning",
      uptime: "10 days",
      lastSeen: "5 minutes ago",
      cpu: "75%",
      memory: "80%",
      type: "access-point",
    },
  ]);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleAddDevice = (newDevice: {
    name: string;
    model: string;
    ip: string;
    type: string;
  }) => {
    const device: Device = {
      id: devices.length + 1,
      ...newDevice,
      status: "online",
      uptime: "0 days",
      lastSeen: "Just now",
      cpu: "0%",
      memory: "0%",
    };
    setDevices([...devices, device]);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Network Devices
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all network devices in your infrastructure
            </p>
          </div>
          {isAdmin && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add Device
              </button>
            </div>
          )}
        </div>

        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Model</TableHeaderCell>
                <TableHeaderCell>IP Address</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Uptime</TableHeaderCell>
                <TableHeaderCell>CPU</TableHeaderCell>
                <TableHeaderCell>Memory</TableHeaderCell>
                <TableHeaderCell>Last Seen</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell>
                    <Badge
                      color={device.status === "online" ? "green" : "yellow"}>
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{device.uptime}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            parseInt(device.cpu) > 70
                              ? "bg-red-500"
                              : parseInt(device.cpu) > 50
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: device.cpu }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {device.cpu}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            parseInt(device.memory) > 70
                              ? "bg-red-500"
                              : parseInt(device.memory) > 50
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: device.memory }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {device.memory}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{device.lastSeen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <AddDeviceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddDevice}
        />
      </div>
    </PageTransition>
  );
}
