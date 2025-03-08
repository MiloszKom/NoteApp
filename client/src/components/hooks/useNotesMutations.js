import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../utils/toastAlert";
import { createNote, deleteNote, editNote } from "../api/noteApis";

export const useNotesMutations = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
      successAlert(data.message);
      navigate("/");
    },
  });

  const editNoteMutation = useMutation({
    mutationFn: editNote,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
      successAlert(data.message);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
      successAlert(data.message);
    },
  });

  return {
    createNoteMutation,
    editNoteMutation,
    deleteNoteMutation,
  };
};
