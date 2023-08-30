import { useState } from 'react';

function InitTableLogic() {

  const [selectionModel, setSelectionModel] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return {
    selectionModel,
    setSelectionModel,
    isEdit,
    setIsEdit,
    openDeleteDialog,
    setOpenDeleteDialog
  }
}

export default InitTableLogic