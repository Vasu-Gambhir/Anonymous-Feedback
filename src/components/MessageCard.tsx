"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

type messageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: messageCardProps) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id as string);
  };

  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg p-1 bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="overflow-hidden text-ellipsis text-2xl font-semibold text-gray-700 w-80">
            <span className="">{message.content}</span>
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-md"
                variant="destructive"
              >
                <X className="w-7 h-7" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-gray-400 font-semibold">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
