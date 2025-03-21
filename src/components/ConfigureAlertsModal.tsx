"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface AlertThreshold {
  type: string;
  warning: number;
  critical: number;
  enabled: boolean;
}

interface ConfigureAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (thresholds: AlertThreshold[]) => void;
  currentThresholds?: AlertThreshold[];
}

export default function ConfigureAlertsModal({
  isOpen,
  onClose,
  onSave,
  currentThresholds,
}: ConfigureAlertsModalProps) {
  const [thresholds, setThresholds] = useState<AlertThreshold[]>(
    currentThresholds || [
      { type: "CPU Usage", warning: 70, critical: 90, enabled: true },
      { type: "Memory Usage", warning: 80, critical: 95, enabled: true },
      { type: "Network Latency", warning: 100, critical: 200, enabled: true },
      { type: "Packet Loss", warning: 1, critical: 5, enabled: true },
    ]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(thresholds);
    onClose();
  };

  const handleThresholdChange = (
    index: number,
    field: keyof AlertThreshold,
    value: number | boolean
  ) => {
    const newThresholds = [...thresholds];
    newThresholds[index] = { ...newThresholds[index], [field]: value };
    setThresholds(newThresholds);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            Configure Alert Thresholds
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Metric
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Warning Threshold
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Critical Threshold
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Enabled
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {thresholds.map((threshold, index) => (
                    <tr key={threshold.type}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {threshold.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <input
                          type="number"
                          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={threshold.warning}
                          onChange={(e) =>
                            handleThresholdChange(
                              index,
                              "warning",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <input
                          type="number"
                          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={threshold.critical}
                          onChange={(e) =>
                            handleThresholdChange(
                              index,
                              "critical",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={threshold.enabled}
                          onChange={(e) =>
                            handleThresholdChange(
                              index,
                              "enabled",
                              e.target.checked
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
