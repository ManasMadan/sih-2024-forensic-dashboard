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
import { PersonProfile } from "./Profile/PersonProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { createPerson } from "@/actions/profile";

export default function AddDataSourceButton({ caseId }: { caseId: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  // On Adding Evidence it should be allowed to link to person profile
  const EVIDENCE_TYPES = [
    { id: "call_logs", name: "Call Logs", component: null },
    { id: "system_logs", name: "System Logs", component: null },
    { id: "disk_images", name: "Disk Images", component: null },
    { id: "registry_entries", name: "Registry Entries", component: null },
    { id: "police_records", name: "Police Records", component: null },
    { id: "witness_statements", name: "Witness Statements", component: null },
    { id: "images", name: "Evidence Images", component: null },
    { id: "videos", name: "Evidence Videos", component: null },
    { id: "cctv", name: "CCTV Videos", component: null },
    { id: "text", name: "Text", component: null },
    { id: "network_logs", name: "Network Logs", component: null },
    { id: "browser_history", name: "Browser History", component: null },
    { id: "email_records", name: "Email Records", component: null },
    { id: "social_media_data", name: "Social Media Data", component: null },
    { id: "financial_records", name: "Financial Records", component: null },
    { id: "gps_data", name: "GPS Data", component: null },
    { id: "mobile_device_data", name: "Mobile Device Data", component: null },
    { id: "audio_recordings", name: "Audio Recordings", component: null },
    { id: "forensic_reports", name: "Forensic Reports", component: null },
    { id: "dna_evidence", name: "DNA Evidence", component: null },
    { id: "fingerprints", name: "Fingerprints", component: null },
    { id: "ballistics", name: "Ballistics", component: null },
    { id: "document_analysis", name: "Document Analysis", component: null },
    { id: "digital_footprints", name: "Digital Footprints", component: null },
  ];

  // Using Webhook URLs
  const DATA_SOURCES = [
    { id: "live_location", name: "Live Location Tracking", component: null },
    { id: "live_phone_tapping", name: "Live Phone Tapping", component: null },
    { id: "live_call_logs", name: "Live Call Logs", component: null },
    { id: "live_system_logs", name: "Live System Logs", component: null },
    { id: "live_video", name: "Live Video Feed", component: null },
    { id: "live_audio", name: "Live Audio", component: null },
    {
      id: "live_network_monitoring",
      name: "Live Network Monitoring",
      component: null,
    },
    {
      id: "live_social_media",
      name: "Live Social Media Monitoring",
      component: null,
    },
    {
      id: "live_financial_transactions",
      name: "Live Financial Transactions",
      component: null,
    },
    {
      id: "live_email_monitoring",
      name: "Live Email Monitoring",
      component: null,
    },
    {
      id: "live_messaging_apps",
      name: "Live Messaging Apps Monitoring",
      component: null,
    },
    {
      id: "live_web_activity",
      name: "Live Web Activity Monitoring",
      component: null,
    },
  ];

  // Profile
  const PROFILES = [
    {
      id: "person_profile",
      name: "Person Data",
      component: (
        <PersonProfile
          onSubmit={async (data) => {
            await toast.promise(createPerson(data, caseId), {
              loading: "Creating Person Profile...",
              success: "Person Profile Created!",
              error: "Error creating Person Profile",
            });

            setSelected(null);
          }}
        />
      ),
    },
    { id: "vehicle_profile", name: "Vehicle Data", component: null },
    { id: "location_profile", name: "Location Data", component: null },
  ];

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
    setOpen(false);
    setSelected(item.id);
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

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {
                [...EVIDENCE_TYPES, ...DATA_SOURCES, ...PROFILES].find(
                  (r) => r.id === selected
                )?.name
              }
            </DialogTitle>
          </DialogHeader>
          {
            [...EVIDENCE_TYPES, ...DATA_SOURCES, ...PROFILES].find(
              (r) => r.id === selected
            )?.component
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}
