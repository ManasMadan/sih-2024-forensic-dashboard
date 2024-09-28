"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

// On Adding Evidence it should be allowed to link to person profile
const EVIDENCE_TYPES = [
  { id: "call_logs", name: "Call Logs" },
  { id: "system_logs", name: "System Logs" },
  { id: "disk_images", name: "Disk Images" },
  { id: "registry_entries", name: "Registry Entries" },
  { id: "police_records", name: "Police Records" },
  { id: "witness_statements", name: "Witness Statements" },
  { id: "images", name: "Evidence Images" },
  { id: "videos", name: "Evidence Videos" },
  { id: "cctv", name: "CCTV Videos" },
  { id: "text", name: "Text" },
  { id: "network_logs", name: "Network Logs" },
  { id: "browser_history", name: "Browser History" },
  { id: "email_records", name: "Email Records" },
  { id: "social_media_data", name: "Social Media Data" },
  { id: "financial_records", name: "Financial Records" },
  { id: "gps_data", name: "GPS Data" },
  { id: "mobile_device_data", name: "Mobile Device Data" },
  { id: "audio_recordings", name: "Audio Recordings" },
  { id: "forensic_reports", name: "Forensic Reports" },
  { id: "dna_evidence", name: "DNA Evidence" },
  { id: "fingerprints", name: "Fingerprints" },
  { id: "ballistics", name: "Ballistics" },
  { id: "document_analysis", name: "Document Analysis" },
  { id: "digital_footprints", name: "Digital Footprints" },
];

// Using Webhook URLs
const DATA_SOURCES = [
  { id: "live_location", name: "Live Location Tracking" },
  { id: "live_phone_tapping", name: "Live Phone Tapping" },
  { id: "live_call_logs", name: "Live Call Logs" },
  { id: "live_system_logs", name: "Live System Logs" },
  { id: "live_video", name: "Live Video Feed" },
  { id: "live_audio", name: "Live Audio" },
  { id: "live_network_monitoring", name: "Live Network Monitoring" },
  { id: "live_social_media", name: "Live Social Media Monitoring" },
  { id: "live_financial_transactions", name: "Live Financial Transactions" },
  { id: "live_email_monitoring", name: "Live Email Monitoring" },
  { id: "live_messaging_apps", name: "Live Messaging Apps Monitoring" },
  { id: "live_web_activity", name: "Live Web Activity Monitoring" },
];

// Profile
const PROFILES = [
  { id: "person_profile", name: "Person Data" },
  { id: "vehicle_profile", name: "Vehicle Data" },
  { id: "location_profile", name: "Location Data" },
];

export default function AddDataSourceButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: { id: string; name: string }) => {
    console.log(`Selected: ${item.name}`);
    setOpen(false);
    // Here you would handle the selection, potentially opening a modal for more details
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="flex gap-x-4 mb-4">
        <PlusCircleIcon />
        Add Evidence / Source
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search evidence, sources, or profiles..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Evidence Types">
              {EVIDENCE_TYPES.map((type) => (
                <CommandItem key={type.id} onSelect={() => handleSelect(type)}>
                  {type.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Data Sources">
              {DATA_SOURCES.map((source) => (
                <CommandItem
                  key={source.id}
                  onSelect={() => handleSelect(source)}
                >
                  {source.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Profiles">
              {PROFILES.map((profile) => (
                <CommandItem
                  key={profile.id}
                  onSelect={() => handleSelect(profile)}
                >
                  {profile.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
