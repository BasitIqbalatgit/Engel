"use client";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";

interface ConfirmationDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  severity?: "danger" | "warning" | "info" | "success";
  icon?: string;
  loading?: boolean;
}

export default function ConfirmationDialog({
  visible,
  onHide,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  severity = "danger",
  icon = "pi pi-exclamation-triangle",
  loading = false
}: ConfirmationDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
    } finally {
      setIsProcessing(false);
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case "danger": return "text-red-600 bg-red-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "info": return "text-blue-600 bg-blue-50";
      case "success": return "text-green-600 bg-green-50";
      default: return "text-red-600 bg-red-50";
    }
  };

  const getSeverityIconColor = () => {
    switch (severity) {
      case "danger": return "text-red-500";
      case "warning": return "text-yellow-500";
      case "info": return "text-blue-500";
      case "success": return "text-green-500";
      default: return "text-red-500";
    }
  };

  const getConfirmButtonSeverity = () => {
    switch (severity) {
      case "danger": return "danger";
      case "warning": return "warning";
      case "info": return "info";
      case "success": return "success";
      default: return "danger";
    }
  };

  const footer = (
    <div className="flex justify-end gap-3 pt-4">
      <Button
        label={cancelLabel}
        icon="pi pi-times"
        onClick={onHide}
        outlined
        disabled={isProcessing || loading}
        className="px-4 py-2"
      />
      <Button
        label={confirmLabel}
        icon={isProcessing || loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        onClick={handleConfirm}
        severity={getConfirmButtonSeverity()}
        disabled={isProcessing || loading}
        loading={isProcessing || loading}
        className="px-4 py-2"
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={null}
      footer={footer}
      closable={!isProcessing && !loading}
      className="w-full max-w-md mx-4"
      draggable={false}
      resizable={false}
      modal
      maskClassName="bg-black bg-opacity-50"
    >
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor()}`}>
            <i className={`${icon} text-xl ${getSeverityIconColor()}`}></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}