"use client";

import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createCase } from "@/actions/case";
import toast from "react-hot-toast";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchUsers } from "@/actions/user";
import { User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import tagsData from "@/lib/tags";

const TagsArray: Option[] = tagsData.map((tag) => ({ value: tag, label: tag }));

export default function NewCasePage() {
  const { user } = useUser();
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<Option[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);

  const handleUserSearch = async () => {
    try {
      const user = await searchUsers(searchEmail);
      if (user === null) return;
      const userObject = JSON.parse(user);
      setInvitedUsers([...invitedUsers, userObject]);
      setSearchEmail("");
    } catch (error) {
      console.error("Error searching for user:", error);
      toast.error("Failed to find user");
    }
  };

  const handleSubmit = async () => {
    if (!user || !nameRef.current || !descriptionRef.current) return;

    const newCase = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      status: "ACTIVE",
      userId: [user.id, ...invitedUsers.map((user) => user.id)],
      tags: tags.map((tag) => tag.value),
    };

    try {
      const createdCase = await createCase(newCase);
      router.push(`/case/${createdCase.id}`);
    } catch (error) {
      console.error("Error creating case:", error);
    }
  };

  return (
    <div className="flex flex-col gap-12 py-12">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Case</CardTitle>
          <CardDescription>
            Fill in the details to create a new case
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Case Name</Label>
            <Input id="name" ref={nameRef} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" ref={descriptionRef} required />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>
            Adding Appropriate Tags will help in finding the case for future
            research.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <MultipleSelector
            value={tags}
            onChange={setTags}
            defaultOptions={TagsArray}
            placeholder="Select tags..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Invite Users</CardTitle>
          <CardDescription>
            Invite People To Collaboratively Work on the case
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search user by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <Button onClick={handleUserSearch}>Search</Button>
          </div>
          {invitedUsers.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user.firstName}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          setInvitedUsers(
                            invitedUsers.filter((u) => u.id !== user.id)
                          )
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Button
        className="w-fit mx-auto"
        onClick={() =>
          toast.promise(handleSubmit(), {
            loading: "Creating Case",
            error: "Something Went Wrong",
            success: "Case Created",
          })
        }
      >
        Create Case
      </Button>
    </div>
  );
}
